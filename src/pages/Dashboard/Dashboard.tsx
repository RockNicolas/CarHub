import { useEffect, useState, useContext  } from 'react'
import { Container } from "../../components/container/Container";
import { DashboardHeader } from '../../components/PainellHeader/PainelHeader'
import { FiTrash2 } from 'react-icons/fi'
import { collection, getDocs, where, query } from 'firebase/firestore'
import { db } from '../../services/FireBaseConnection'
import { AuthContext } from '../../context/AuthContext'

interface CarProps{
  id: string;
  name: string;
  year: string;
  price: string | number;
  city: string;
  km: string;
  images: ImageCarProps[];
  uid: string;
}

interface ImageCarProps{
  name: string;
  uid: string;
  url: string
}

export function Dashboard() {
  const [cars, setCars] = useState<CarProps[]>([]); 
  const { user } = useContext(AuthContext);

  useEffect(() => {

    function loadCars(){
      if(!user?.uid){
        return;
      }

      const carsRef = collection(db, "cars")
      const queryRef = query(carsRef, where("uid", "==", user.uid))

      getDocs(queryRef)
      .then((snapshot) => {
        let listcars = [] as CarProps[];

        snapshot.forEach( doc => {
          listcars.push({
            id: doc.id,
            name: doc.data().name,
            year: doc.data().year,
            km: doc.data().km,
            city: doc.data().city,
            price: doc.data().price,
            images: doc.data().images,
            uid: doc.data().uid
          })
        })

        setCars(listcars);  
        console.log(listcars);
        
      })

    }

    loadCars();

  }, [user])


  return (
    <Container>
      <DashboardHeader/>

      <main className="grid gird-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

        <section className="w-full bg-white rounded-lg relative">
          <button 
          onClick={ () => {} }
          className="absolute bg-white w-14 h-14 rounded-full flex items-center justify-center right-2 top-2 drop-shadow"
          >
            <FiTrash2 size={26} color="#000" />
          </button>

          <img
            className="w-full rounded-lg mb-2 max-h-70"
            src="https://firebasestorage.googleapis.com/v0/b/webcarros-c5b8b.appspot.com/o/images%2F25hyaPULbGMZoMefJICHYhItmhR2%2F9ca87edb-3570-4ea7-8bcb-305800a153ea?alt=media&token=5ce07c69-a9af-4426-b8ca-624328bb2135"
          />
          <p className="font-bold mt-1 px-2 mb-2">NISSAN VERSA</p>

          <div className="flex flex-col px-2">
            <span className="text-zinc-700">
              Ano 2016/2016 | 230.000 km
            </span>
            <strong className="text-black font-bold mt-4">
              R$ 150.000
            </strong>
          </div>

          <div className="w-full h-px bg-slate-200 my-2"></div>
          <div className="px-2 pb-2">
            <span className="text-black">
              Campo Grande - MS
            </span>
          </div>

        </section>

      </main>

    </Container>
  )
}