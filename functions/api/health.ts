export const onRequest = () =>
  new Response(
    JSON.stringify({ ok: true, app: 'magical-mystery-house' }),
    { headers: { 'content-type': 'application/json' } }
  )
