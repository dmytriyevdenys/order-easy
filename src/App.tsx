import s from "./App.module.scss"

export const App: React.FC = () => { 

    return ( 
        <div className={s.container}>
            <p >Перший TS проєкт</p>
           <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum tenetur numquam soluta ducimus doloribus. Modi molestias deserunt, doloremque obcaecati quae suscipit asperiores incidunt dolorum nulla quod libero tempora quisquam enim!
           </p>
        </div>
    )
}