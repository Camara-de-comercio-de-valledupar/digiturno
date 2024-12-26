import Pusher from 'pusher-js'
import Echo from 'laravel-echo'
import Ably from "ably";

window.Pusher = Pusher;
window.Ably = Ably;


window.Echo = new Echo({
  broadcaster: 'pusher',
  key: import.meta.env.VITE_ECHO_KEY,
  cluster: import.meta.env.VITE_ECHO_CLUSTER,
  forceTLS: import.meta.env.VITE_ECHO_FORCE_TLS,
})

