"use client";

import { useEffect, useState } from "react";
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
    <div className="px-4 sm:px-0">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Team Members</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          {showForm ? "Cancel" : "Add Member"}
        </button>
      </div>

      {showForm && (
        <div className="bg-white shadow rounded-lg p-6 mb-8">
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
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
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              >
                {editingMember ? "Update" : "Create"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {members.length === 0 ? (
            <li className="px-6 py-8 text-center text-gray-500">
              No team members yet. Add your first team member!
            </li>
          ) : (
            members.map((member) => (
              <li key={member.id}>
                <div className="px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    {member.image && (
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-16 h-16 object-cover rounded-full"
                      />
                    )}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {member.name}
                      </h3>
                      <p className="text-sm text-gray-500">{member.title}</p>
                      {member.bio && (
                        <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                          {member.bio}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(member)}
                      className="text-indigo-600 hover:text-indigo-900 px-3 py-1 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(member.id)}
                      className="text-red-600 hover:text-red-900 px-3 py-1 text-sm"
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
