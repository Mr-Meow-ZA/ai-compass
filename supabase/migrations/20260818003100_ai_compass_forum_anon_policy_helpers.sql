-- Anonymous readers need to evaluate public-read policies that include the moderator helper.
-- With no authenticated user ai_compass_is_moderator() deterministically returns false.
grant execute on function public.ai_compass_is_moderator() to anon;
