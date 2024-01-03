import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import s from './PackerTable.module.scss'
import { StatusSell } from './StatusCell/StatusCell';
import { Cell } from './Cell/Cell';

type IntDocTable = { 
id: number ,
IntDocNumber: string,
createdAt: string,
status: string,
order_id?: number | undefined,
packer?: {
  name: string
}
}
const columnHelper = createColumnHelper<IntDocTable>();

export const PackerTable: React.FC<{data: IntDocTable[]}> = ({data}) => {
 const columns = [
  columnHelper.accessor('IntDocNumber' ,{
    header: () => '№ ТТН',
    cell: info => <Cell content ={info.getValue()}/>,
  }),
 
  columnHelper.accessor('createdAt', { 
    header: 'Час сканування',
    cell: info => info.getValue()
  }),
  columnHelper.accessor('order_id' , {
    header: 'Номер замовлення',
    cell: info => info.getValue()
  }),
  columnHelper.accessor('status', {
    header: () => 'Статус',
    cell: info => <StatusSell status={info.getValue()}></StatusSell>
  }),
  ...data.some((item) => item.packer?.name)
  ? [columnHelper.accessor('packer.name', {
      header: () => 'Пакувальник',
      cell: (info) => info.row.original.packer?.name || 'N/A',
    })]
  : [],
]  
  const table = useReactTable<IntDocTable>({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
    }); 
  return (
    <div className={s.table_container}>
    <table className={s.table}>
      <thead className={s.header}>
        {table.getHeaderGroups().map((headerElem) => (
          <tr key={headerElem.id} >
            {headerElem.headers.map((columnElem) => (
              <th key={columnElem.id}>
                {flexRender(
                  columnElem.column.columnDef.header,
                  columnElem.getContext()
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
      {!data.length ? (
            <h1 >Нічого не знайдено</h1>
          ) : (
            table.getRowModel().rows.map((rowElem) => (
              <tr key={rowElem.id}>
                {rowElem.getVisibleCells().map((cellElem) => (
                  <td key={cellElem.id} className={s.td}>
                    {flexRender(cellElem.column.columnDef.cell, cellElem.getContext())}
                  </td>
                ))}
              </tr>
            ))
          )}
      </tbody>
    </table>
  </div>
  )
}