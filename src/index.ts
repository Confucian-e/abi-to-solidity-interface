export function abiToSolidityInterface(
  abi: any[],
  contractName: string
): string {
  let interfaceString = `interface ${contractName} {\n`;

  for (const item of abi) {
    if (item.type === "function") {
      const inputs = item.inputs
        .map((input: any) => {
          let type = input.type;
          // 为 bytes、string 和结构体类型添加 calldata 修饰符
          if (
            type === "bytes" ||
            type === "string" ||
            type.startsWith("tuple")
          ) {
            type = `${type} calldata`;
          }
          return `${type} ${input.name}`;
        })
        .join(", ");
      const outputs = item.outputs
        ? item.outputs.map((output: any) => output.type).join(", ")
        : "";
      const functionSignature = `    function ${item.name}(${inputs}) external${
        item.stateMutability === "view" || item.stateMutability === "pure"
          ? " view"
          : ""
      }${outputs ? ` returns (${outputs})` : ""};\n`;
      interfaceString += functionSignature;
    } else if (item.type === "event") {
      const params = item.inputs
        .map(
          (input: any) =>
            `${input.type}${input.indexed ? " indexed" : ""} ${input.name}`
        )
        .join(", ");
      const eventSignature = `    event ${item.name}(${params});\n`;
      interfaceString += eventSignature;
    }
  }

  interfaceString += "}";
  return interfaceString;
}
