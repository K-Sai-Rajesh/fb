import * as Yup from 'yup';

export const features = {
  font_Family: [
    "Nunito",
    "Ubuntu",
    "Sevillana",
    "Dancing Script",
    "EB Garamond",
    "Edu TAS Beginner",
    "Libre Baskerville",
    "Montserrat",
    "Rajdhani",
    "Raleway",
    "Teko",
  ],
  font_Weight: Array.from({ length: 10 }, (_, i) => i * 100),
  font_Size: Array.from({ length: 50 }, (_, i) => i + 1),
  border: [
    "none",
    "hidden",
    "dotted",
    "dashed",
    "solid",
    "double",
    "groove",
    "ridge",
    "inset",
    "outset",
    "initial",
    "inherit",
  ],
  border_Size: Array.from({ length: 50 }, (_, i) => i + 1),
  font_Style: ["normal", "italic"],
  grid: [2, 4, 6, 12],
};

function stringToColor(string) {
  let hash = 0;
  let i;
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = "#";
  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
}

export function stringAvatar(name) {
  const string1 = name?.split(" ")[0][0];
  const string2 = name?.split(" ")[1] ? name?.split(" ")[1][0] : "";
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${string1}${string2}`,
  };
}

export const profileHeaders = [
  {
    name: 'firstname',
    label: 'First Name',
    type: 'text',
    disable: false
  },
  {
    name: 'lastname',
    label: 'Last Name',
    type: 'text',
    disable: false
  },
  {
    name: 'phone',
    label: 'Phone Number',
    type: 'number',
    disable: false
  },
  {
    name: 'email',
    label: 'Email',
    type: 'text',
    disable: true
  },
  {
    name: 'id',
    label: "Seller's Id",
    type: 'number',
    disable: true
  },
  {
    name: 'role',
    label: 'Role',
    type: 'text',
    disable: true
  },
  {
    name: 'appliedDate',
    label: 'Applied Date',
    type: 'date',
    disable: true
  },
  {
    name: 'approvedDate',
    label: 'Approved Date',
    type: 'date',
    disable: true
  },
  {
    name: 'shopStartTime',
    label: "Opens At",
    type: 'time',
    disable: false
  },
  {
    name: 'shopEndTime',
    label: 'Closes At',
    type: 'time',
    disable: false
  },
  {
    name: 'shopName',
    label: 'Shop Name',
    type: 'text',
    disable: false
  },
  {
    name: 'gst',
    label: 'GST Number',
    type: 'text',
    disable: false
  }
]

export const button = {
  backgroundColor: '#aaa',
  color: 'text.secondary',
  fontWeight: 'bold',
  fontSize: '12px',
  fontFamily: 'Raleway'
}

export const customerProfileHeaders = [
  {
    name: 'firstname',
    label: 'First Name',
    type: 'text',
    disable: false
  },
  {
    name: 'lastname',
    label: 'Last Name',
    type: 'text',
    disable: false
  },
  {
    name: 'phone',
    label: 'Phone Number',
    type: 'number',
    disable: false
  },
  {
    name: 'email',
    label: 'Email',
    type: 'text',
    disable: true
  }
]

export const securityHeaders = [
  {
    name: 'oldpassword',
    label: 'Old Password',
    type: 'password',
    disable: false
  },
  {
    name: 'newpassword',
    label: 'New Password',
    type: 'password',
    disable: false
  },
  {
    name: 'confirmpassword',
    label: 'Confirm Password',
    type: 'password',
    disable: false
  },
]

export const customerKeys = [
  {
    id: "firstname",
    label: "First Name (*)",
    type: 'text',
    colSize: 4,
    isList: false,
    error: Yup.string().required(`Please enter First  Name !`)
  },
  {
    id: "lastname",
    label: "Last Name (*)",
    type: 'text',
    colSize: 4,
    isList: false,
    error: Yup.string().required(`Please enter Last  Name !`)
  },
  {
    id: "email",
    label: "Email Address (*)",
    type: 'text',
    isList: false,
    colSize: 4,
    error: Yup.string().required(`Please enter Email !`)
  },
  {
    id: "phone",
    label: "Phone Number (*)",
    type: 'number',
    isList: false,
    colSize: 4,
    error: Yup.number().required(`Please enter phone number !`)
  },
  {
    id: "password",
    label: "Password (*)",
    type: 'password',
    isList: false,
    colSize: 4,
    error: Yup.string().required(`Please enter password !`)
  },
  {
    id: "latitude",
    label: "Latitude (*)",
    type: 'number',
    isList: false,
    colSize: 4,
    error: Yup.number().required(`Please enter latitute of the shop !`)
  },
  {
    id: "longitude",
    label: "Longitude (*)",
    type: 'number',
    isList: false,
    colSize: 4,
    error: Yup.number().required(`Please enter longitute of the shop !`)
  },
  {
    id: "error",
    label: "Error (meters)",
    type: 'number',
    isList: false,
    colSize: 4
  },
]

export const links = [
  {
    link: 'admin',
    label: 'admin',
    access: ['admin']
  },
  {
    link: 'add category',
    label: 'add category',
    access: ['admin']
  },
  {
    link: 'profile/basic info',
    label: 'profile',
    access: ['admin', 'seller', 'customer']
  },
  {
    link: 'account',
    label: 'account',
    access: ['admin', 'seller']
  },
  {
    link: 'products',
    label: 'products',
    access: ['admin', 'seller']
  },
  {
    link: 'wish list',
    label: 'wish list',
    access: ['customer']
  }
]

export const authRoutes = [
  {
    route: 'basic info',
    access: ['admin', 'seller', 'customer']
  },
  {
    route: 'security',
    access: ['admin', 'seller', 'customer']
  },
  {
    route: 'account',
    access: ['admin', 'seller']
  },
  {
    route: 'products',
    access: ['admin', 'seller']
  },
  {
    route: 'add product',
    access: ['admin', 'seller']
  },
  {
    route: 'edit product',
    access: ['admin', 'seller']
  },
  {
    route: 'admin',
    access: ['admin']
  },
  {
    route: 'add category',
    access: ['admin']
  },
  {
    route: 'wish list',
    access: ['customer']
  }
]

// new 

export const sellerFields = [
  {
    name: 'firstname',
    label: 'First Name',
    type: 'text',
    xs: 12,
    sm: 6,
    md: 3,
    lg: 3,
    isList: false,
    disable: false,
    error: Yup.string().required("Field can't be empty !")
  },
  {
    name: 'lastname',
    label: 'Surname Name',
    type: 'text',
    xs: 12,
    sm: 6,
    md: 3,
    lg: 3,
    isList: false,
    disable: false,
    error: Yup.string().required("Field can't be empty !")
  },
  {
    name: 'phonenumber',
    label: 'Contact Number',
    type: 'number',
    xs: 12,
    sm: 6,
    md: 3,
    lg: 3,
    isList: false,
    disable: false,
    error: Yup.string().matches(/^\d{10}$/, 'Mobile numberr must be exactly 10 digits').required(`Please enter  mobile number!`)
  },
  {
    name: 'business',
    label: 'Business Name',
    type: 'text',
    xs: 12,
    sm: 6,
    md: 3,
    lg: 3,
    isList: false,
    disable: false,
    error: Yup.string().required("Field can't be empty !")
  },
  {
    name: 'opensat',
    label: "Open's At",
    type: 'time',
    xs: 12,
    sm: 6,
    md: 4,
    lg: 4,
    isList: false,
    disable: false,
    error: Yup.string().required("Field can't be empty !")
  },
  {
    name: 'closeeat',
    label: "Closed At",
    type: 'time',
    xs: 12,
    sm: 6,
    md: 4,
    lg: 4,
    isList: false,
    disable: false,
    error: Yup.string().required("Field can't be empty !")
  },
  {
    name: 'category',
    label: 'Category',
    type: 'text',
    xs: 12,
    sm: 6,
    md: 4,
    lg: 4,
    isList: false,
    disable: false,
    error: Yup.string().required("Field can't be empty !")
  },
  {
    name: 'address',
    label: 'Address',
    type: 'text',
    xs: 12,
    isList: false,
    disable: false,
    error: Yup.string().required("Field can't be empty !")
  },
  {
    name: 'email',
    label: 'Email Address',
    type: 'email',
    xs: 12,
    sm: 6,
    md: 4,
    lg: 4,
    isList: false,
    disable: false,
    error: Yup.string().required("Field can't be empty !")
  },
  {
    name: 'password',
    label: 'Password',
    type: 'text',
    xs: 12,
    sm: 12,
    md: 4,
    lg: 4,
    isList: false,
    disable: false,
    error: Yup.string().required("Field can't be empty !")
  },
  {
    name: 'gst',
    label: 'GST',
    type: 'text',
    xs: 12,
    sm: 12,
    md: 4,
    lg: 4,
    isList: false,
    disable: false,
    error: Yup.string().required("Field can't be empty !")
  },
]

export const customerFields = [
  {
    name: 'firstname',
    label: 'First Name',
    type: 'text',
    xs: 12,
    sm: 4,
    md: 3,
    lg: 3,
    isList: false,
    disable: false,
    error: Yup.string().required("Field can't be empty !")
  },
  {
    name: 'lastname',
    label: 'Surname Name',
    type: 'text',
    xs: 12,
    sm: 4,
    md: 3,
    lg: 3,
    isList: false,
    disable: false,
    error: Yup.string().required("Field can't be empty !")
  },
  {
    name: 'email',
    label: 'Email Address',
    type: 'email',
    xs: 12,
    sm: 4,
    md: 4,
    lg: 3,
    isList: false,
    disable: false,
    error: Yup.string().required("Field can't be empty !")
  },
  {
    name: 'password',
    label: 'Password',
    type: 'text',
    xs: 12,
    sm: 12,
    md: 4,
    lg: 3,
    isList: false,
    disable: false,
    error: Yup.string().required("Field can't be empty !")
  },
  {
    name: 'address',
    label: 'Address',
    type: 'text',
    xs: 12,
    isList: false,
    disable: false,
    error: Yup.string().required("Field can't be empty !")
  },
]

export const images = [
  'https://mui.com/static/images/avatar/1.jpg',
  'https://mui.com/static/images/avatar/2.jpg',
  'https://mui.com/static/images/avatar/3.jpg',
  // Add more image URLs as needed
];

export function convertToBase64(file) {
  return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
          resolve(reader.result);
      };
      reader.onerror = (error) => {
          reject(error);
      };
      reader.readAsDataURL(file);
  });
}