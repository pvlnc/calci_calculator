import { Shortcuts } from "../../constants/shortcuts"
import { Icon } from "@iconify-icon/react/dist/iconify.mjs"
import './Shortcut.css'

export default function Shortcut(){
    return(
        <>
            <table>
                <thead>
                    <th>Id</th>
                    <th>Symbols</th>
                    <th>Using</th>
                </thead>
                { Shortcuts.map((short)=>(
                <tbody>
                   <td>
                        {short.shortcut}
                 </td> 
                 <td>
                   
                 { short.shortcut === "+"?
                    <Icon icon="fluent:keyboard-shift-24-regular" />  : ""
                }
                 <Icon icon={short.symbol} />    
                 </td>
                 <td>
                    {short.defination}
                 </td>
                 

                </tbody>
                 ))}
            </table>
        </>
    )
}