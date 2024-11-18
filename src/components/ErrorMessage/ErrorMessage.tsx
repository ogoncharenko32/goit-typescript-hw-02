type ErrorMessageParams = {
  errorHtml: string;
};

const ErrorMessage = ({ errorHtml }: ErrorMessageParams) => {
  return <h3>{errorHtml}</h3>;
};

export default ErrorMessage;
