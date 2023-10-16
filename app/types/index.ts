import { IconType } from "react-icons";

export type ServiceProp = {
  id: string;
  serviceName: string;
  serviceDescription: string;
  price: number;
  image: string;
  categoryId: string;
  created: string;
  createBy: string;
  lastModified: string;
  lastModifiedBy: null;
  isDelete: boolean;
};

export type PackageProps = {
  id: string;
  packageName: string;
  weekNumberBooking: number;
  dateDoInWeek: string[];
  image: string | null;
  totalPrice: number;
  packageDescription: string;
  created: string;
  createBy: null;
  lastModified: null;
  lastModifiedBy: null;
  isDelete: boolean;
};

export type GetCategory = {
  id: string;
  categoryName: string;
  created: string;
  createBy: string;
  lastModified: string;
  lastModifiedBy: null;
  isDelete: boolean;
  image: IconType;
};

// "id": "b17c9d4c-b164-4097-8d5f-03d2246da758",
//     "packageName": "Vận chuyên giao vận package",
//     "weekNumberBooking": 6,
//     "numberOfPerWeekDoPackage": 2,
//     "dayDoInWeek": [
//       "Thứ 3",
//       "Thứ 7"
//     ],
//     "image": null,
//     "totalPrice": 0,
//     "created": "2023-10-11T01:30:40.5956316",
//     "createBy": null,
//     "lastModified": null,
//     "lastModifiedBy": null,
//     "isDelete": false
