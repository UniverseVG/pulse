const Text = (props: any) => {
  const { dangerouslyHtml, style, className, children, ...rest } = props;

  if (dangerouslyHtml) {
    return (
      <div
        className={className}
        style={style}
        dangerouslySetInnerHTML={{ __html: dangerouslyHtml }}
        {...rest}
      />
    );
  }

  return (
    <div className={className} style={style} {...rest}>
      {children}
    </div>
  );
};

export default Text;
