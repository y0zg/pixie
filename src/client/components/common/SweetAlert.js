import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import 'sweetalert2/dist/sweetalert2.all.min.js';

export default class SweetAlert {
  static MySwal = withReactContent(Swal);

  static fire(...args) {
    return this.MySwal.fire(...args);
  }
}
