import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { 
  faBars, 
  faBell, 
  faUser, 
  faCrown,
  faHome,
  faFolder,
  faFile,
  faChartLine,
  faCog,
  faChevronDown,
  faUsers,
  faShoppingCart,
  faStar,
  faUserPlus,
  faShoppingBag,
  faComment,
  faPlus,
  faDownload,
  faSun,
  faMoon,
  faChartBar,
  faBoxOpen,
  faSignOutAlt,
  faTimes,
  faCircle,
  faGauge,
  faFilter,
  faEye,
  faEdit,
  faTrash,
  faSearch,
  faInbox,
  faCubes,
  faTable,
  faWindowRestore,
  faPen,
  faPlusCircle
} from '@fortawesome/free-solid-svg-icons'

// This is important, we are going to let Nuxt worry about the CSS
config.autoAddCss = false

// Add icons to the library
library.add(
  faBars,
  faBell,
  faUser,
  faCrown,
  faHome,
  faFolder,
  faFile,
  faChartLine,
  faCog,
  faChevronDown,
  faUsers,
  faShoppingCart,
  faStar,
  faUserPlus,
  faShoppingBag,
  faComment,
  faPlus,
  faDownload,
  faSun,
  faMoon,
  faChartBar,
  faBoxOpen,
  faSignOutAlt,
  faTimes,
  faCircle,
  faGauge,
  faFilter,
  faEye,
  faEdit,
  faTrash,
  faSearch,
  faInbox,
  faCubes,
  faTable,
  faWindowRestore,
  faPen,
  faPlusCircle
)

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon)
})
