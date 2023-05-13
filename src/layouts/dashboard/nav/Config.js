// component
import SvgColor from '../../../components/svg-color/SvgColor'

const icon = (name) => <SvgColor src={`/assets/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />

const navConfig = [
    {
      title: 'dashboard',
      path: '/app',
      icon: icon('ic_dashboard'),
    },
    {
        title: 'suppliers',
        path: '/suppliers',
        icon: icon('ic_suppliers'),
    },
    {
        title: 'orders',
        path: '/orders',
        icon: icon('ic_orders'),
    },
    {
        title: 'checkouts',
        path: '/checkout',
        icon: icon('ic_checkouts'),
    },
    {
        title: 'subsidiaries',
        path: '/subsidiaries',
        icon: icon('ic_subsidiaries'),
    },
];

export default navConfig;