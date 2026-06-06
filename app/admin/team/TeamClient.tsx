"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageUpload } from "../components/ImageUpload";
import { MultiImageUpload } from "../components/MultiImageUpload";
import { useConfirm } from "../components/ConfirmModal";
import { toast } from "sonner";
import { IconPlus, IconPencil, IconTrash, IconX, IconUsers } from "@tabler/icons-react";

interface TeamMember {
  id: string;
  name: string;
  title: string;
  image: string;
  bio: string;
  gallery: string[];
  createdAt: Date;
  updatedAt: Date;
}

const emptyForm = () => ({ name: "", title: "", image: "", bio: "", gallery: [] as string[] });

export function TeamClient({ initialMembers }: { initialMembers: TeamMember[] }) {
  const [members, setMembers] = useState<TeamMember[]>(initialMembers);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [formData, setFormData] = useState(emptyForm());
  const [confirmModal, confirm] = useConfirm();

  const set = (key: string, value: unknown) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  const fetchMembers = async () => {
    const res = await fetch("/api/team");
    const data = await res.json();
    setMembers(data.members || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const url = editingMember ? `/api/team/${editingMember.id}` : "/api/team";
      const method = editingMember ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        toast.success(editingMember ? "Member updated!" : "Member added!");
        await fetchMembers();
        resetForm();
      } else {
        const err = await res.json();
        toast.error(err.error || "Failed to save team member");
      }
    } catch {
      toast.error("Network error — please try again");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    const ok = await confirm({
      title: "Remove team member?",
      message: `"${name}" will be permanently removed.`,
      confirmLabel: "Remove",
    });
    if (!ok) return;
    try {
      const res = await fetch(`/api/team/${id}`, { method: "DELETE" });
      if (res.ok) {
        setMembers((prev) => prev.filter((m) => m.id !== id));
        toast.success("Team member removed");
      } else {
        toast.error("Failed to delete team member");
      }
    } catch {
      toast.error("Network error — please try again");
    }
  };

  const handleEdit = (member: TeamMember) => {
    setEditingMember(member);
    setFormData({ name: member.name, title: member.title, image: member.image, bio: member.bio, gallery: member.gallery || [] });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetForm = () => {
    setFormData(emptyForm());
    setEditingMember(null);
    setShowForm(false);
  };

  return (
    <>
      {confirmModal}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Team</h1>
          <p className="text-slate-500 text-sm mt-0.5">{members.length} member{members.length !== 1 ? "s" : ""}</p>
        </div>
        <button
          onClick={() => (showForm ? resetForm() : setShowForm(true))}
          className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
            showForm ? "bg-slate-100 text-slate-700 hover:bg-slate-200" : "bg-slate-900 text-white hover:bg-slate-700"
          }`}
        >
          {showForm ? <><IconX size={16} /> Cancel</> : <><IconPlus size={16} /> Add Member</>}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl ring-1 ring-slate-200 shadow-sm p-6 mb-8">
          <h2 className="text-lg font-semibold text-slate-900 mb-5">
            {editingMember ? "Edit Member" : "New Team Member"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Name <span className="text-red-500">*</span></label>
                <input type="text" required value={formData.name} onChange={(e) => set("name", e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Title <span className="text-red-500">*</span></label>
                <input type="text" required value={formData.title} onChange={(e) => set("title", e.target.value)}
                  placeholder="e.g., Lead Architect"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent" />
              </div>
              <div className="sm:col-span-2">
                <ImageUpload value={formData.image} onChange={(url) => set("image", url)} folder="adrs/team" label="Profile Image" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">Bio</label>
                <textarea rows={4} value={formData.bio} onChange={(e) => set("bio", e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent resize-none" />
              </div>
              <div className="sm:col-span-2">
                <MultiImageUpload value={formData.gallery} onChange={(urls) => set("gallery", urls)} folder="adrs/team/gallery" label="Team Member Gallery" maxImages={10} />
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button type="submit" disabled={saving}
                className="px-5 py-2.5 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-700 disabled:opacity-50 transition-colors">
                {saving ? "Saving..." : editingMember ? "Update Member" : "Add Member"}
              </button>
              <button type="button" onClick={resetForm}
                className="px-5 py-2.5 bg-slate-100 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-200 transition-colors">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl ring-1 ring-slate-200 shadow-sm overflow-hidden">
        {members.length === 0 ? (
          <div className="py-16 text-center text-slate-400">
            <IconUsers className="mx-auto mb-3 text-slate-200" size={40} />
            <p className="font-medium">No team members yet</p>
          </div>
        ) : (
          <ul className="divide-y divide-slate-100">
            {members.map((member) => (
              <li key={member.id} className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors">
                {member.image ? (
                  <Image src={member.image} alt={member.name} width={48} height={48}
                    className="w-11 h-11 rounded-full object-cover shrink-0 ring-2 ring-slate-100" />
                ) : (
                  <div className="w-11 h-11 rounded-full bg-slate-200 flex items-center justify-center shrink-0">
                    <span className="text-slate-500 text-sm font-bold">{member.name[0]}</span>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-900 truncate">{member.name}</p>
                  <p className="text-sm text-slate-500 truncate">{member.title}</p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button onClick={() => handleEdit(member)} title="Edit"
                    className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
                    <IconPencil size={16} />
                  </button>
                  <button onClick={() => handleDelete(member.id, member.name)} title="Delete"
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <IconTrash size={16} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
