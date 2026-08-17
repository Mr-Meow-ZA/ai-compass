# Quality Score

## Review — 2026-08-18 Community + My Compass candidate (0.8.0)

Build `2026-08-18.1` is the first AI Compass release candidate with a real account/community backend. It adds public forum reading, passwordless profiles, threads/replies, social/follow signals, accepted/helpful answers, reporting/moderation, guide-linked discussions and private My Compass learning/follow state while preserving the editorial architecture and 41-guide baseline.

This score is for the **candidate architecture**, not a claim that 0.8 is production-approved. Real signed-in acceptance and the underlying 0.7 deployment remain release gates.

| Area | Score | Evidence and remaining limitations |
|---|---:|---|
| Mobile usability | 9.4 | Community home renders all 11 live categories cleanly at 390px and preserves existing bottom navigation. Profile/category/My Compass/guide/learning surfaces are responsive. Real signed-in testing on physical iOS/Android remains outstanding. |
| Navigation | 9.6 | Community becomes a real destination and My Compass supplies a personal return route without replacing reader-first editorial navigation. Guide discussions and learning progress are contextual rather than separate silos. |
| Visual design | 9.5 | Community uses the calm publication system rather than a generic social-network aesthetic. Manual screenshot review caught default button styling; dedicated community-control styling corrected it before release documentation. |
| Accessibility | 9.2 | Forum forms use labels, dialog semantics and plain-text content; controls retain responsive target sizing. Keyboard/screen-reader testing of authenticated flows remains outstanding. |
| Performance | 8.8 | Editorial app remains static. Supabase JS is lazy-loaded asynchronously so backend/client failure cannot block editorial rendering. Community adds network reads and still needs pagination/aggregation work for large real-world volume. |
| Reliability | 9.7 | RLS exists on all 13 new forum/My Compass tables; database guards constrain posting authority/rate limits; trigger functions are removed from browser RPC; live anonymous browser smoke reads real Supabase data. Signed-in persistence still needs manual acceptance. |
| Information architecture | 9.8 | Editorial, user-generated content and private reader state have explicit separate roles. One linked-content discussion model can support Guides now and Tools/Models/Courses/Resources/Paths later without duplicating comment systems. |
| Search and filtering | 9.3 | Forum has local discussion search and category routing; editorial search remains strong. Cross-site generated taxonomy/search including community is still future work. |
| Content discovery | 9.8 | Readers can move Guide → Discussion, Path → Progress, Community → relevant topic, and My Compass → followed/learning state. This materially improves return journeys. |
| Trustworthiness | 9.8 | Community popularity cannot change editorial truth/rankings. Auth email is excluded from public profile data, follows/progress are private, user text is escaped, reports/moderation are explicit, and community guidelines define evidence/AI-assistance/privacy boundaries. |
| Usefulness to beginners | 9.7 | Beginner Help provides an explicit low-barrier discussion area while AI Essentials remains the structured learning entry point. |
| Usefulness to experienced users | 9.8 | Agents, builders, enterprise and showcase categories plus guide-linked implementation discussion create a useful practitioner layer on top of the technical guide library. |
| Retention / continuity | 9.4 | My Compass introduces cross-device follows and learning progress plus community identity. Notifications, recently viewed and new-since-last-visit are not implemented yet. |
| Community safety/readiness | 8.8 | RLS, protected roles, reporting, moderation logging, plain-text rendering, database rate guards and thread-bump prevention are implemented. Account-data export/deletion semantics, moderator suspension tooling and signed-in production acceptance are still open. |

**Candidate overall product score: 9.4/10.** The headline score remains deliberately conservative. Community and My Compass materially increase product value, but a higher score before real magic-link acceptance, privacy/account lifecycle completion, physical-device accessibility testing and Vercel release verification would overstate readiness.

## 0.8 validation completed so far

- All new Supabase forum/My Compass objects are namespaced `ai_compass_*` inside the existing shared project.
- RLS is enabled on 10 forum/profile tables plus 3 My Compass retention tables.
- The browser uses only Supabase URL + publishable key; no service-role/secret is committed.
- Passwordless sign-in is implemented with `signInWithOtp`.
- Public profiles omit auth email.
- Roles are separate from editable profiles.
- Database guards enforce author identity, active-profile requirement, accepted-answer integrity and posting/reply limits.
- Abuse hardening prevents authors from manually bumping thread activity timestamps.
- Trigger functions are explicitly removed from the browser-callable RPC surface.
- Supabase security-advisor review shows no new AI Compass forum/My Compass findings; unrelated pre-existing shared-project warnings were left untouched.
- `scripts/validate-community.js` checks database/security/runtime contracts alongside the existing manifest/content validators.
- `scripts/smoke-community.sh` reads the real Supabase backend anonymously and renders Community, Profile, category, mobile, My Compass, a guide discussion surface and a learning-progress surface.
- One complete pre-My-Compass implementation head passed all six Chromium suites; later My Compass heads continue through the same gate.

## 0.8 release blockers / next quality targets

- PR #27 / 0.7.0 must safely merge/deploy first; its Vercel Preview is currently blocked by a free-plan build-rate limit, not a code failure.
- Supabase Auth redirect allow-list must include the canonical AI Compass production host and an approved test preview without changing unrelated shared-project auth settings.
- A real signed-in acceptance test must verify magic-link return, profile creation, thread/reply, Like/Follow, guide-linked discussion, learning completion and persistence after refresh/reopen.
- Moderator queue/role behaviour needs one controlled signed-in acceptance path before public moderator use.
- Account/community-data export and deletion semantics are not finished. Shared Supabase Auth means “delete account” cannot blindly delete the shared auth user without considering other apps.
- Notification preferences/delivery, recently viewed and new-since-last-visit are not implemented.
- Forum count queries should be replaced with more scalable aggregate/pagination patterns before large community volume.
- Physical iOS Safari / Android Chrome and assistive-technology testing remain desirable.
- Exact merged-SHA GitHub Actions and Vercel production evidence remain mandatory for publication.

## Historical review — 0.7.0 Maintainability & Freshness candidate

Build `2026-08-17.6` moved Discovery, Curriculum, News Intelligence and Freshness into schema-validated JSON behind a shared manifest, removed parallel maintained JS sources and added visible maintenance state.

**Historical/candidate 0.7.0 score: 9.4/10.** It remained unmerged while Vercel Preview was rate-limited.

## Historical review — 0.6.21 Signal & Curriculum

Build `2026-08-17.5` established source-first News intelligence, five curriculum levels and the AI Power User bridge.

**Historical 0.6.21 score: 9.3/10.**

## Historical review — 0.6.20 Navigation & Discovery

Build `2026-08-17.4` separated Tools/Models, added Courses, strengthened Practical/Resources and reader-first navigation.

**Historical 0.6.20 score: 9.3/10.**

## Historical review — 0.6.2 content/mobile baseline

**Historical 0.6.2 score: 9.2/10.**
