import { serve } from "https://deno.land/std@0.190.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Mock data simulating a response from the FluentCRM API
const mockLeads = [
  { id: 1, first_name: 'Alice', last_name: 'Johnson', email: 'alice.j@email.com', created_at: '2023-10-26T10:00:00Z' },
  { id: 2, first_name: 'Bob', last_name: 'Williams', email: 'bob.w@email.com', created_at: '2023-10-25T15:30:00Z' },
  { id: 3, first_name: 'Charlie', last_name: 'Brown', email: 'charlie.b@email.com', created_at: '2023-10-25T11:45:00Z' },
  { id: 4, first_name: 'Diana', last_name: 'Miller', email: 'diana.m@email.com', created_at: '2023-10-24T09:00:00Z' },
];

serve(async (req: Request) => {
  // This is required for CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // In a real-world scenario, you would add logic here to fetch data from the actual FluentCRM API.
    const data = { leads: mockLeads };

    return new Response(
      JSON.stringify(data),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error: any) {
    return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})