import { DashboardReview } from "@/types/index";
import { Fragment } from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";

type ItemGridProps = {
  reviews: DashboardReview[];
};

export default function ReviewGrid({ reviews }: ItemGridProps) {
  const checkStatus = (status : string) => {
    switch (status) {
      case "hasIssues":
        return "bg-red-400";
      case "approved":
        return "bg-emerald-400";
      case "underReview":
      default:
        return "bg-ambar-400";
    }
  };

  return (
    <ul role="list" className="grid grid-cols-4 gap-4">
      {reviews.map((review) => (
        <li
          key={review._id}
          className="flex justify-between gap-2 rounded-md bg-white px-10 py-8 shadow-lg cursor-pointer"
        >
          <div className="title flex items-center gap-3">
            <span
              className={`w-4 h-4 ${checkStatus(
                review.status
              )} rounded-full block`}
              title={review.status}
            ></span>
            <h2>
              {review.reviewName.length > 15
                ? review.reviewName.substring(0, 10) + "..."
                : review.reviewName}
            </h2>
          </div>
          <div className="card-menu self-center">
            <Menu as="div" className="relative flex-none">
              <MenuButton className="-m-2.5 block p-2.5 text-gray-500 hover:text-white cursor-pointer rounded-full bg-gray-200 hover:bg-red-500 transition-colors">
                <span className="sr-only">opciones</span>
                <EllipsisVerticalIcon className="h-6 w-6" aria-hidden="true" />
              </MenuButton>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 px-3 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                  <MenuItem>
                    <Link
                      to={``}
                      className="block px-3 py-1 text-sm leading-6 text-gray-900"
                    >
                      Ver Revisión
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link
                      to={`/reviews/${review._id}/edit`}
                      className="block px-3 py-1 text-sm leading-6 text-gray-900"
                    >
                      Editar Revisión
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <button
                      type="button"
                      className="block px-3 py-1 text-sm leading-6 text-red-500 cursor-pointer"
                      onClick={() => {}}
                    >
                      Eliminar Revisión
                    </button>
                  </MenuItem>
                </MenuItems>
              </Transition>
            </Menu>
          </div>
        </li>
      ))}
    </ul>
  );
}
