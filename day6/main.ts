const input = await Deno.readTextFile("input.txt");

console.log(input);

const last4chars: string[] = [];

input.split("").forEach((letter, index) => {
  last4chars.push(letter);

  while (last4chars.length > 14) {
    last4chars.shift();
  }

  if (last4chars.length == 14) {
    const temp = [...last4chars];

    console.log(temp)

    for (let i = 0; i < 14; i++) {
      const char = temp.pop();

      if (temp.includes(char!)) {
        break;
      }
    }

    if (temp.length == 0) {
      console.log(index + 1);
      Deno.exit();
    }

  }
});