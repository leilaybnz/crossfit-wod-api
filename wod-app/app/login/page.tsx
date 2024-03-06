import { authenticate } from '../actions'
 
export default function Page() {
  return (
    <form action={authenticate}>
      <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Contraseña" required />
      <button type="submit">Login</button>
    </form>
  )
}