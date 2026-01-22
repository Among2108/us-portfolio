import { MdDelete } from "react-icons/md";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState, useEffect } from "react";
import { MoreHorizontalIcon } from "lucide-react";

export function SkillCart() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const store = JSON.parse(localStorage.getItem("skills")) || [];
    setSkills(store);
  }, []);

  const handleRemove = (name) => {
    const update = skills.filter((skill) => skill.name !== name);
    setSkills(update);
    localStorage.setItem("skills", JSON.stringify(update));
  };

  return (
    <Table className="">
      <TableHeader>
        <TableRow className="text-2xl">
          <TableHead className="">Product</TableHead>
          <TableHead className="text-center">Skill</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {skills.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={3}
              className="text-center text-muted-foreground"
            >
              ยังไม่มี skill
            </TableCell>
          </TableRow>
        ) : (
          skills.map((item, index) => (
            <TableRow key={index} className="">
              <TableCell className="font-medium ">
                <img src={item.pic} alt={item.name} className="w-10 h-10 object-contain" />
              </TableCell>
              <TableCell className="text-center">{item.name}</TableCell>
              <TableCell className="text-right">
                <button
                  className="!bg-white"
                  onClick={() => handleRemove(item.name)}
                >
                  <MdDelete className="text-amber-500 size-4" />
                </button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}

export default SkillCart;
