export class HomeController extends Controller {
  constructor(){
    super()
  }
  index(){
    return view('welcome','Hello world!')
  }
}