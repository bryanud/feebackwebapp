
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tzrmwbqwkyyzilnmpdns.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR6cm13YnF3a3l5emlsbm1wZG5zIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODczMzM0MjksImV4cCI6MjAwMjkwOTQyOX0.CuseoJN7p120xtQyk6dDbhBourHUKwutvUjReYTexQo';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;