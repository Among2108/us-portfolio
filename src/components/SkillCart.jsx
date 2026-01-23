import { MdDelete } from "react-icons/md";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";

export function SkillCart({ onChange }) {
  const [skills, setSkills] = useState([]);

  const load = () => {
    const store = JSON.parse(localStorage.getItem("skills")) || [];
    setSkills(store);
  };

  useEffect(() => {
    load();
  }, []);

  const handleRemove = (name) => {
    const next = skills.filter((s) => s.name !== name);
    setSkills(next);
    localStorage.setItem("skills", JSON.stringify(next));
    onChange?.(); // ✅ แจ้ง Home ให้อัปเดต badge
  };

  const clearAll = () => {
    setSkills([]);
    localStorage.setItem("skills", JSON.stringify([]));
    onChange?.(); // ✅ แจ้ง Home ให้อัปเดต badge
  };

  return (
    <div className="space-y-3">
      {/* top actions */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Total: <span className="font-semibold text-foreground">{skills.length}</span>
        </div>

        <button
          onClick={clearAll}
          disabled={skills.length === 0}
          className="
            rounded-md px-3 py-1 text-sm
            bg-black text-white
            disabled:opacity-40 disabled:cursor-not-allowed
          "
        >
          Clear all
        </button>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="text-2xl">
            <TableHead>Product</TableHead>
            <TableHead className="text-center">Skill</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {skills.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="text-center text-muted-foreground">
                ยังไม่มี skill
              </TableCell>
            </TableRow>
          ) : (
            skills.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  <img
                    src={item.pic}
                    alt={item.name}
                    className="w-10 h-10 object-contain"
                    loading="lazy"
                  />
                </TableCell>

                <TableCell className="text-center">{item.name}</TableCell>

                <TableCell className="text-right">
                  <button
                    className="bg-white"
                    onClick={() => handleRemove(item.name)}
                    aria-label={`delete ${item.name}`}
                  >
                    <MdDelete className="text-amber-500 size-5" />
                  </button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default SkillCart;
