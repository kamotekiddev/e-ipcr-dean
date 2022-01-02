import { FiCalendar, FiClock, FiFolder, FiUsers } from "react-icons/fi";

const sidebarItems = [
  { id: 1, path: "/dashboard", title: "Evaluations", icon: FiFolder },
  {
    id: 2,
    path: "/dashboard/ongoing-evaluations",
    title: "Ongoing Evaluations",
    icon: FiClock,
  },
  {
    id: 3,
    path: "/dashboard/past-evaluations",
    title: "Past Evaluations",
    icon: FiCalendar,
  },
  { id: 4, path: "/dashboard/faculties", title: "Faculties", icon: FiUsers },
];

export default sidebarItems;
