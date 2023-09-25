import CreateUser from './components/createusers/createuser'
import Getallusers from './components/getallusers/getallusers'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     <Getallusers/>
     <br></br>
     <div><CreateUser/></div>
      
  
    </main>
  )
}
