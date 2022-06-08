import React from "react"
import { supabase } from "./../supabaseClient"
function Home() {
  console.log(supabase.auth.user())
  return <div>Home</div>
}

export default Home
