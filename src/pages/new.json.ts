import { APIRoute } from "astro";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://giumzdclcufdhctrcyon.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;

export const post: APIRoute = async ({ request, redirect }) => {
  const supabase = createClient(supabaseUrl, supabaseKey);

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
  return redirect("/");
};
