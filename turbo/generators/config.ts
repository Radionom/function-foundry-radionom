import { PlopTypes } from '@turbo/gen'

const installPackages: PlopTypes.CustomActionFunction = async (props: any) => {
    // run pnpm without deps
    const execa = await import('e