# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Patients** use the web application to review records associated with their own account.
- **Clinic staff** use the web application to review records for patients assigned to them and to create, edit, or delete those records.

## Product Purpose

This is a hands-on TanStack Start and TanStack Form practice project. It makes authenticated patient and clinic-staff record workflows concrete while exercising role-aware routing, form validation, server functions, and database-backed application behavior.

The product should be treated as a learning implementation, not represented as a production clinical system.

## Positioning

Its distinctive position is a practical TanStack form and full-stack workflow exercise. Future work should favor clear learning value and trustworthy role-based behavior over unsupported production, security, or regulatory claims.

## Operating Context

- Users work in a web browser and sign in with an email address and password.
- Authentication determines the initial destination for patients and staff.
- Patients can browse their own record list and open an individual record.
- Staff can browse records for assigned patients, add a record, edit a record, and delete a record after confirmation.
- Records are stored in the application's PostgreSQL database and linked to patient accounts.

## Capabilities and Constraints

- Preserve the existing patient and staff workflows unless the user explicitly changes them.
- Target WCAG 2.2 AA as the accessibility baseline.
- UI work must not edit backend code, even when backend implementation issues are discovered. Report those issues instead of changing them.
- Future UI work must work with the existing application data and behavior rather than replacing the backend with mock data.
- The regulatory, certification, and production-security posture is not established. Do not claim compliance or production readiness without explicit evidence and approval.

## Brand Commitments

- No fixed user-facing product name, brand identity, or voice has been established.
- Do not invent customer names, testimonials, clinical claims, or institutional endorsements.

## Evidence on Hand

- The repository contains the current authentication, patient-record, and staff-record workflows.
- `src/db/schema.ts` defines users, patient records, and staff-to-patient assignments.
- The application uses real PostgreSQL records through TanStack Start server functions.
- No verified testimonials, customer logos, case studies, performance benchmarks, compliance evidence, or production credentials are available for product claims.

## Product Principles

1. Keep patient and staff responsibilities and data visibility clear.
2. Make real application behavior more trustworthy than mock or decorative content.
3. Treat WCAG 2.2 AA as a baseline for every interface change.
4. Preserve backend boundaries during UI work and surface backend concerns without silently changing them.
5. Describe the product honestly as a TanStack practice application until stronger evidence supports a different claim.

## Accessibility & Inclusion

- Meet WCAG 2.2 AA for keyboard access, focus behavior, semantics, labels, contrast, status communication, and responsive interaction.
