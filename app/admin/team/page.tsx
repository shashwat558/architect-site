"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ImageUpload } from "../components/ImageUpload";
import { MultiImageUpload } from "../components/MultiImageUpload";

interface TeamMember {
  id: string;
  name: string;
  title: string;
  image: string;
  bio: string;
  gallery: string[];
  createdAt: string;
}

export default function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    title: "",
    image: "",
    bio: "",
    gallery: [] as string[],
  });

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const res = await fetch("/api/team");
      const data = await res.json();
      setMembers(data.members || []);
    } catch (error) {
      console.error("Failed to fetch members:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingMember ? `/api/team/${editingMember.id}` : "/api/team";
      const method = editingMember ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        fetchMembers();
        resetForm();
      } else {
        const error = await res.json();
        alert(error.error || "Failed to save team member");
      }
    } catch (error) {
      console.error("Failed to save team member:", error);
      alert("Failed to save team member");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this team member?")) return;

    try {
      const res = await fetch(`/api/team/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchMembers();
      }
    } catch (error) {
      console.error("Failed to delete team member:", error);
    }
  };

  const handleEdit = (member: TeamMember) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      title: member.title,
      image: member.image,
      bio: member.bio,
      gallery: member.gallery || [],
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({ name: "", title: "", image: "", bio: "", gallery: [] });
    setEditingMember(null);
    setShowForm(false);
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Team Members</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-indigo-600 text-white px-4 py-3 rounded-md hover:bg-indigo-700 self-start sm:self-auto min-h-11"
        >
          {showForm ? "Cancel" : "Add Member"}
        </button>
      </div>

      {showForm && (
        <div className="bg-white shadow rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
          <h2 className="text-xl font-semibold mb-4">
            {editingMember ? "Edit Team Member" : "Create Team Member"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g., Lead Architect"
                />
              </div>
              <div className="sm:col-span-2">
                <ImageUpload
                  value={formData.image}
                  onChange={(url) => setFormData({ ...formData, image: url })}
                  folder="adrs/team"
                  label="Profile Image"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <textarea
                  rows={4}
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData({ ...formData, bio: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="sm:col-span-2">
                <MultiImageUpload
                  value={formData.gallery}
                  onChange={(urls) => setFormData({ ...formData, gallery: urls })}
                  folder="adrs/team/gallery"
                  label="Team Member Gallery"
                  maxImages={10}
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                type="submit"
                className="bg-indigo-600 text-white px-4 py-3 rounded-md hover:bg-indigo-700 min-h-11"
              >
                {editingMember ? "Update" : "Create"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-200 text-gray-700 px-4 py-3 rounded-md hover:bg-gray-300 min-h-11"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white shadow overflow-hidden rounded-md">
        <ul className="divide-y divide-gray-200">
          {members.length === 0 ? (
            <li className="px-4 sm:px-6 py-8 text-center text-gray-500">
              No team members yet. Add your first team member!
            </li>
          ) : (
            members.map((member) => (
              <li key={member.id}>
                <div className="px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex items-start sm:items-center gap-4 flex-1 min-w-0">
                    {member.image && (
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={64}
                        height={64}
                        className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-full shrink-0"
                      />
                    )}
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base sm:text-lg font-medium text-gray-900 break-words">
                        {member.name}
                      </h3>
                      <p className="text-sm text-gray-500">{member.title}</p>
                      {member.bio && (
                        <p className="text-sm text-gray-400 mt-1 line-clamp-2 break-words">
                          {member.bio}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 sm:ml-4 shrink-0">
                    <button
                      onClick={() => handleEdit(member)}
                      className="text-indigo-600 hover:text-indigo-900 px-3 py-2 text-sm min-h-11"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(member.id)}
                      className="text-red-600 hover:text-red-900 px-3 py-2 text-sm min-h-11"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
