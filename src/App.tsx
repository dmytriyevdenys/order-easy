import { useQuery } from "@tanstack/react-query"
import s from "./App.module.scss"
import { packerService } from "./services/packer.service"
import { useState } from "react"
import { IPacker } from "./interfaces/packer.interface"

export const App: React.FC = () => { 

    const {isLoading, data} = useQuery(
        ['packers'],
        () => packerService.getAllPackers(),
        {
            select: ({ data }) => data.data
        }
    )

    const [selectedPackerId, setSelectedPackerId] = useState<number | null>(null);

    const setPacker = (packer: IPacker) => {
        alert(`Ви обрали пакувальника ${packer.name}`)
        setSelectedPackerId(packer.id);
    }

    console.log(selectedPackerId);
    
    return ( 
        <div className={s.container}>
            <h1 >Тестова сторінка покувальника</h1>
        {isLoading ? (
            <div>Loading...</div>
        ): data?.length ? data.map( packer => (
            <div 
            key={packer.id} 
            onClick={() => setPacker(packer)}>{packer.name}
            </div>
        ))
        : <h2>Покувальників не знайдено</h2>

    }
        </div>
    )
}