import { prisma } from "@/lib/prisma";
import { IconMail } from "@tabler/icons-react";

export default async function ContactPage() {
  const contacts = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Contact Submissions</h1>
        <p className="text-slate-500 text-sm mt-0.5">
          {contacts.length} submission{contacts.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="bg-white rounded-xl ring-1 ring-slate-200 shadow-sm overflow-hidden">
        {contacts.length === 0 ? (
          <div className="py-16 text-center text-slate-400">
            <IconMail className="mx-auto mb-3 text-slate-200" size={40} />
            <p className="font-medium">No submissions yet</p>
          </div>
        ) : (
          <ul className="divide-y divide-slate-100">
            {contacts.map((contact: (typeof contacts)[number]) => (
              <li key={contact.id} className="px-6 py-5">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="font-semibold text-slate-900">
                    {contact.firstName} {contact.lastName}
                  </span>
                  <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                    {new Date(contact.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  {contact.projectType && (
                    <span className="text-xs text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                      {contact.projectType}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-4 text-sm mb-3">
                  <a
                    href={`mailto:${contact.email}`}
                    className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    <IconMail size={14} />
                    {contact.email}
                  </a>
                  {contact.phone && (
                    <a
                      href={`tel:${contact.phone}`}
                      className="text-slate-600 hover:text-slate-900 transition-colors"
                    >
                      {contact.phone}
                    </a>
                  )}
                </div>

                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
                    {contact.message}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
