"use client";

import { useEffect, useState } from "react";

interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  projectType?: string;
  message: string;
  createdAt: string;
}

export default function ContactPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await fetch("/api/contact");
      const data = await res.json();
      setContacts(data.items || []);
    } catch (error) {
      console.error("Failed to fetch contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div className="px-4 sm:px-0">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Contact Submissions</h1>
        <p className="text-gray-600 mt-2">View all contact form submissions</p>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {contacts.length === 0 ? (
            <li className="px-6 py-8 text-center text-gray-500">
              No contact submissions yet.
            </li>
          ) : (
            contacts.map((contact) => (
              <li key={contact.id}>
                <div className="px-6 py-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-medium text-gray-900">
                          {contact.firstName} {contact.lastName}
                        </h3>
                        <span className="text-sm text-gray-500">
                          {new Date(contact.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="mt-2 text-sm text-gray-600">
                        <p>
                          <span className="font-medium">Email:</span>{" "}
                          <a
                            href={`mailto:${contact.email}`}
                            className="text-indigo-600 hover:underline"
                          >
                            {contact.email}
                          </a>
                        </p>
                        {contact.phone && (
                          <p>
                            <span className="font-medium">Phone:</span>{" "}
                            <a
                              href={`tel:${contact.phone}`}
                              className="text-indigo-600 hover:underline"
                            >
                              {contact.phone}
                            </a>
                          </p>
                        )}
                        {contact.projectType && (
                          <p>
                            <span className="font-medium">Project Type:</span>{" "}
                            {contact.projectType}
                          </p>
                        )}
                      </div>
                      <div className="mt-3 p-3 bg-gray-50 rounded-md">
                        <p className="text-sm text-gray-700 whitespace-pre-wrap">
                          {contact.message}
                        </p>
                      </div>
                    </div>
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
