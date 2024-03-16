import { PlopTypes } from '@turbo/gen'

const installPackages: PlopTypes.CustomActionFunction = async (props: any) => {
    // run pnpm without deps
    const execa = await import('execa')
    await execa.execa('pnpm', ['install'])

    return 'Installed packages with "pnpm"'
}

export default function generator(plop: PlopTypes.NodePlopAPI): void {
    plop.setGenerator('tool', {
        description: 'Generates a new tool',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: "The name of the tool to create, e.g. 'zoomApi', 'pdf', etc.",
                validate: (input: string) => {
                    if (input.includes('.')) {
                        return 'tool name cannot include an extension'
                    }
                    if (input.includes(' ')