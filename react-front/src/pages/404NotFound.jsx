import { Button, Link } from "@nextui-org/react";

export default function NotFound() {
  return (
    <div className="bg-[url('https://clienthero.io/h0vmmZS8WO4')] bg-center bg-cover flex p-8 md:p-20 justify-center w-full flex-col items-center h-screen">
      <div className="bg-black/20 backdrop-blur-[5px] inset-0 absolute z-[1]" />
      <div className="w-full text-center text-white mb-8 relative z-50">
        <h2>Whooops! We think you are lost</h2>
        <h5>Don’t worry, we are gonna help you to go back</h5>
      </div>
      <div className="flex flex-wrap justify-center w-full gap-8 relative z-50">
        <Button as={Link} variant="flat" href="/">
          Go back to home
        </Button>
      </div>
    </div>
  );
}
