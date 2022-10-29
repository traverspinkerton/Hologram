import type { Context } from "https://edge.netlify.com";
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";
const supabaseUrl = "https://giumzdclcufdhctrcyon.supabase.co";
const SUPABASE_KEY = Deno.env.get("SUPABASE_KEY");
export default async (request: Request, context: Context) => {
  const supabase = createClient(supabaseUrl, SUPABASE_KEY);

  const formData = await request.formData();
  const [[_w, what], [_f, feel]] = formData.entries();

  const { error } = await supabase
    .from("feels")
    .insert([{ what: what, feelings: [feel] }]);

  if (error) {
    return new Response("There was a problem saving this entry", {
      status: 400,
    });
  }
  return Response.redirect("/", 302);
};
