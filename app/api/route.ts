/**
 * Admin API Routes Documentation
 *
 * Base URL: /api
 *
 * === PROJECTS ===
 * GET    /projects                    - List all projects (pagination with skip/take)
 * POST   /projects                    - Create new project
 * GET    /projects/[id]               - Get single project with relations
 * PUT    /projects/[id]               - Update project details
 * DELETE /projects/[id]               - Delete project (cascades to relations)
 *
 * GET    /projects/[projectId]/meta   - List project metadata
 * POST   /projects/[projectId]/meta   - Create project metadata
 * PUT    /projects/[projectId]/meta   - Update project metadata
 * DELETE /projects/[projectId]/meta   - Delete project metadata
 * GET    /projects/[projectId]/materials      - List project materials
 * POST   /projects/[projectId]/materials      - Create project material
 * PUT    /projects/[projectId]/materials      - Update project material
 * DELETE /projects/[projectId]/materials      - Delete project material
 * GET    /projects/[projectId]/testimonial    - Get project testimonial
 * POST   /projects/[projectId]/testimonial    - Create project testimonial
 * PUT    /projects/[projectId]/testimonial    - Update project testimonial
 * DELETE /projects/[projectId]/testimonial    - Delete project testimonial
 * GET    /projects/[projectId]/team           - List team assignments for project
 * POST   /projects/[projectId]/team           - Assign team member to project
 * PUT    /projects/[projectId]/team           - Update team member role on project
 * DELETE /projects/[projectId]/team           - Remove team member from project
 *
 * === TEAM ===
 * GET    /team                        - List all team members (pagination)
 * POST   /team                        - Create new team member
 * GET    /team/[id]                   - Get single team member with relations
 * PUT    /team/[id]                   - Update team member
 * DELETE /team/[id]                   - Delete team member
 *
 * GET    /team/[memberId]/socials     - List team member social links
 * POST   /team/[memberId]/socials     - Create social link
 * PUT    /team/[memberId]/socials     - Update social link
 * DELETE /team/[memberId]/socials     - Delete social link
 *
 * === OFFERS ===
 * GET    /offers                      - List all offers (pagination)
 * POST   /offers                      - Create new offer
 * GET    /offers/[id]                 - Get single offer
 * PUT    /offers/[id]                 - Update offer
 * DELETE /offers/[id]                 - Delete offer
 *
 * === CONTACT ===
 * POST   /contact                     - Submit contact form (public)
 * GET    /contact                     - List contact submissions (admin)
 *
 * === SUBSCRIBERS ===
 * POST   /subscribers                 - Subscribe via email (public)
 * GET    /subscribers                 - List subscribers (admin)
 *
 * === UPLOAD ===
 * POST   /upload                      - Upload image to Cloudinary (returns URL)
 * GET    /upload                      - Upload endpoint info
 *
 * === VALIDATION ===
 * - All endpoints validate required fields
 * - Email validation on contact submissions
 * - Unique slug validation for projects
 * - Cascade deletes for related data
 *
 * === RESPONSE FORMAT ===
 * Success: { data or array, status: 200/201 }
 * Error:   { error: string, status: 400/404/500 }
 * List:    { items: array, total: number, skip: number, take: number }
 */

import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    {
      message: "AD.RS Admin API",
      version: "1.0.0",
      documentation: "See README.md in this directory",
    },
    { status: 200 }
  );
}
