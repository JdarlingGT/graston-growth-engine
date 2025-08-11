// File contents excluded from context

// ... existing code ...
  React.ComponentPropsWithoutRef<"div"> & { index: number }
>(({ index, className, ...props }, ref) => {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = (inputOTPContext as any).slots[index]

  return (
    <div
// ... existing code ...