import { Loader } from '../Loader/Loader'

// eslint-disable-next-line func-names
export const withQuery = (WrappedComponent) => function ({
  isLoading, isError, error, ...rest
}) {
  if (isError) {
    return (
      <div className="d-flex justify-content-center">
        {error.message}
      </div>
    )
  }
  if (isLoading) return <Loader />

  return <WrappedComponent {...rest} />
}
