"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageUpload } from "../components/ImageUpload";
import { MultiImageUpload } from "../components/MultiImageUpload";
import { useConfirm } from "../components/ConfirmModal";
import { toast } from "sonner";
import { IconPlus, IconPencil, IconTrash, IconX, IconFolderOpen } from "@tabler/icons-react";

interface Project {
  id: string;
  title: string;
  subtitle: string | null;
  category: string;
  year: number;
  location: string;
  brief: string | null;
  approach: string | null;
  image: string;
  heroImage: string;
  gallery: string[];
  processGallery: string[];
  slug: string;
  link: string;
  nextProject: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const emptyForm = () => ({
  title: "",
  subtitle: "",
  category: "",
  year: new Date().getFullYear(),
  location: "",
  brief: "",
  approach: "",
  image: "",
  heroImage: "",
  gallery: [] as string[],
  processGallery: [] as string[],
  slug: "",
});

const generateSlug = (title: string) =>
  title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

interface ProjectsClientProps {
  initialProjects: Project[];
}

export function ProjectsClient({ initialProjects }: ProjectsClientProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState(emptyForm());
  const [confirmModal, confirm] = useConfirm();

  const fetchProjects = async () => {
    const res = await fetch("/api/projects");
    const data = await res.json();
    setProjects(data.projects || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const url = editingProject
        ? `/api/projects/${editingProject.id}`
        : "/api/projects";
      const method = editingProject ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        toast.success(
          editingProject ? "Project updated!" : "Project created!"
        );
        await fetchProjects();
        resetForm();
      } else {
        const err = await res.json();
        toast.error(err.error || "Failed to save project");
      }
    } catch {
      toast.error("Network error — please try again");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    const ok = await confirm({
      title: "Delete project?",
      message: `"${title}" will be permanently deleted. This cannot be undone.`,
      confirmLabel: "Delete",
    });
    if (!ok) return;
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProjects((prev) => prev.filter((p) => p.id !== id));
        toast.success("Project deleted");
      } else {
        toast.error("Failed to delete project");
      }
    } catch {
      toast.error("Network error — please try again");
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      subtitle: project.subtitle || "",
      category: project.category,
      year: project.year,
      location: project.location,
      brief: project.brief || "",
      approach: project.approach || "",
      image: project.image,
      heroImage: project.heroImage || "",
      gallery: project.gallery || [],
      processGallery: project.processGallery || [],
      slug: project.slug,
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetForm = () => {
    setFormData(emptyForm());
    setEditingProject(null);
    setShowForm(false);
  };

  const set = (key: string, value: unknown) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  return (
    <>
      {confirmModal}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Projects</h1>
          <p className="text-slate-500 text-sm mt-0.5">
            {projects.length} project{projects.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          onClick={() => (showForm ? resetForm() : setShowForm(true))}
          className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
            showForm
              ? "bg-slate-100 text-slate-700 hover:bg-slate-200"
              : "bg-slate-900 text-white hover:bg-slate-700"
          }`}
        >
          {showForm ? (
            <>
              <IconX size={16} /> Cancel
            </>
          ) : (
            <>
              <IconPlus size={16} /> Add Project
            </>
          )}
        </button>
      </div>

      {/* Form panel */}
      {showForm && (
        <div className="bg-white rounded-xl ring-1 ring-slate-200 shadow-sm p-6 mb-8">
          <h2 className="text-lg font-semibold text-slate-900 mb-5">
            {editingProject ? "Edit Project" : "New Project"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Title + slug */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => {
                    set("title", e.target.value);
                    if (!editingProject) set("slug", generateSlug(e.target.value));
                  }}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                />
                {formData.slug && (
                  <p className="mt-1 text-xs text-slate-400">
                    URL:{" "}
                    <span className="font-mono text-slate-600">
                      /projects/{formData.slug}
                    </span>
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Subtitle
                </label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => set("subtitle", e.target.value)}
                  placeholder="A tagline for the project"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Category <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.category}
                  onChange={(e) => set("category", e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Year <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  required
                  value={formData.year}
                  onChange={(e) => set("year", parseInt(e.target.value))}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => set("location", e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Brief
                </label>
                <textarea
                  value={formData.brief}
                  onChange={(e) => set("brief", e.target.value)}
                  rows={3}
                  placeholder="Client's requirements and context..."
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent resize-none"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Approach
                </label>
                <textarea
                  value={formData.approach}
                  onChange={(e) => set("approach", e.target.value)}
                  rows={3}
                  placeholder="Design strategy and approach..."
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent resize-none"
                />
              </div>
              <div className="sm:col-span-2">
                <ImageUpload
                  value={formData.image}
                  onChange={(url) => set("image", url)}
                  folder="adrs/projects"
                  label="Thumbnail Image"
                />
              </div>
              <div className="sm:col-span-2">
                <ImageUpload
                  value={formData.heroImage}
                  onChange={(url) => set("heroImage", url)}
                  folder="adrs/projects"
                  label="Hero Image"
                />
              </div>
              <div className="sm:col-span-2">
                <MultiImageUpload
                  value={formData.gallery}
                  onChange={(urls) => set("gallery", urls)}
                  folder="adrs/projects/gallery"
                  label="Project Gallery"
                  maxImages={20}
                />
              </div>
              <div className="sm:col-span-2">
                <MultiImageUpload
                  value={formData.processGallery}
                  onChange={(urls) => set("processGallery", urls)}
                  folder="adrs/projects/process"
                  label="Process Gallery (Sketches, Diagrams)"
                  maxImages={15}
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="px-5 py-2.5 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-700 disabled:opacity-50 transition-colors"
              >
                {saving
                  ? "Saving..."
                  : editingProject
                  ? "Update Project"
                  : "Create Project"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-5 py-2.5 bg-slate-100 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* List */}
      <div className="bg-white rounded-xl ring-1 ring-slate-200 shadow-sm overflow-hidden">
        {projects.length === 0 ? (
          <div className="py-16 text-center text-slate-400">
            <IconFolderOpen className="mx-auto mb-3 text-slate-200" size={40} />
            <p className="font-medium">No projects yet</p>
            <p className="text-sm mt-1">Click &quot;Add Project&quot; to get started</p>
          </div>
        ) : (
          <ul className="divide-y divide-slate-100">
            {projects.map((project) => (
              <li key={project.id} className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors">
                {project.image && (
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={56}
                    height={56}
                    className="w-12 h-12 object-cover rounded-lg shrink-0"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-900 truncate">
                    {project.title}
                  </p>
                  <p className="text-sm text-slate-500 truncate">
                    {project.category} · {project.year}
                    {project.location && ` · ${project.location}`}
                  </p>
                  <p className="text-xs font-mono text-slate-400 mt-0.5 truncate">
                    /projects/{project.slug}
                  </p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => handleEdit(project)}
                    title="Edit"
                    className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <IconPencil size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(project.id, project.title)}
                    title="Delete"
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
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
