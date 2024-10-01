import Nav from '@/components/navbar';
import Checkout from './checkout';
import { checkAnon } from '../login/actions';

export default async function CheckoutPage(){
  await checkAnon();
  return (
    <div id="checkout">
      <Nav/>
      <Checkout/>
    </div>
  )
}