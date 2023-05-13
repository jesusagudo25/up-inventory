// component
import SvgColor from '../../../components/svg-color/SvgColor'

const icon = (name) => <SvgColor src={`/assets/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />

const navConfig = [
    {
      title: 'dashboard',
      path: '/dashboard/app',
      icon: icon('ic_dashboard'),
    },
    {
        title: 'suppliers',
        path: '/dashboard/suppliers',
        icon: icon('ic_suppliers'),
    },
    {
        title: 'orders',
        path: '/dashboard/orders',
        icon: icon('ic_orders'),
    },
    {
        title: 'checkouts',
        path: '/dashboard/checkout',
        icon: icon('ic_checkouts'),
    },
    {
        title: 'subsidiaries',
        path: '/dashboard/subsidiaries',
        icon: icon('ic_subsidiaries'),
    },
];

export default navConfig;