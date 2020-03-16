import React,{Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux';

const withErrorHandler = (WrappedComponent, axios) => {
  // return a class so that we can make a global error handler

  return class extends Component {
    constructor(props){
      super(props);
      this.state = {
        error: null
      };
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({error: null});
        return req;
      }); // clear the error when sending the request

      this.resInterceptor = axios.interceptors.response.use(res=>res,error =>{
        this.setState({error:error});
      });
    }

    // Remove the old interceptors for better use of memory and preventing bugs
    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    errorConfirmedHandler =() =>{
      this.setState({error:null});
    }

    render(){
      return (
        <Aux>
          <Modal
            modify={this.errorConfirmedHandler}
            show={this.state.error}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props}/>
        </Aux>
      );
    }
  }
}

export default withErrorHandler;
