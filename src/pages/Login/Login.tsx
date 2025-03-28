import { useEffect } from 'react'
import logoImg from '../../assets/logo.svg'
import { Container } from '../../components/container/Container'
import { Link , useNavigate } from 'react-router-dom'
import { Input } from '../../components/Input/Input'
import { useForm} from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from '../../services/FireBaseConnection'

const schema = z.object({
  email: z.string().email("Insira um email válido").nonempty("O campo email é obrigatorio"),
  password: z.string().nonempty("O campo senha é obrigatorio")
})

type FormData = z.infer<typeof schema>

export function Login(){
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }} = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange"
  })

  useEffect(() => {
    async function handleLogout(){
      await signOut(auth)
    }
    handleLogout();
  }, [])

    function onSubmit(data: FormData){
      signInWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
        console.log("LOGADO COM SUCESSO")
        navigate ("/dashboard", { replace : true })
      })
      .catch(err => {
        console.log("ERRO AO LOGAR")
        console.log(err)
      })
    }

    return (
      <Container>
          <div className='w-full min-h-screen flex justify-center items-center flex-col gap-4'>
              <Link to='/' className='mb-6 max-w-sm w-full'>
                <img
                  src={logoImg}
                  alt='Logo do site'
                  className='w-full'
                />
              </Link>

              <form 
                className='bg-white max-w-xl w-full rounded-lg p-4'
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className='mb-3'>
                  <Input
                    type="email"
                    placeholder="Digite seu email..."
                    name="email"
                    error={errors.email?.message}
                    register={register}
                  />
                </div>

                <div className='mb-3'>
                  <Input
                    type="password"
                    placeholder="Digite seu senha..."
                    name="password"
                    error={errors.password?.message}
                    register={register}
                  />
                </div>

                <button type='submit' className='bg-zinc-900 w-full rounded-md text-white h-10 font-medium'>
                  Acessar
                </button>

              </form>

               <Link to='/register'>
                  Já possui uma conta? Cadastre-se
              </Link>
          </div>
      </Container>
    )
  }
    
  
  