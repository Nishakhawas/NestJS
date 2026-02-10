import { useState } from "react";
import TrumbowygSimple from "./TrumbowygSimple";

export default function Content({ value, onChange }) {
    const [content, setContent] = useState("");

    return (
        <div className=" w-full">
            <TrumbowygSimple value={value} onChange={onChange} />
        </div>
    );
}
