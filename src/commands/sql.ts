import Command from '../../lib/Command';
import Assyst from '../../lib/Assyst';
import { COOLDOWN_TYPES, PERMISSION_LEVELS } from '../../lib/Enums';
import { ICommandContext } from '../../lib/CInterfaces';
import { Message } from 'detritus-client/lib/structures';
import { inspect } from 'util';
import { Utils } from 'detritus-client';
const { Markup } = Utils;

export default class Cmd extends Command {
    constructor(assyst: Assyst) {
        super({
            name: 'sql',
            aliases: ['db'],
            assyst,
            cooldown: {
                timeout: 0,
                type: COOLDOWN_TYPES.GUILD
            },
            argsMin: 1,
            permissionLevel: PERMISSION_LEVELS.OWNER,
            validFlags: [],
            info: {
                description: 'Run sql on the database',
                examples: ['select count(*) from tags'],
                usage: "[query]",
                author: "Jacherr"
            }
        });
    }

    public async execute(context: ICommandContext): Promise<Message | null> {
        const query = context.args.join(' ');
        const result = await this.assyst.sql(query);
        const rows = inspect(result.rows)
        return context.reply(Markup.codeblock(rows, { language: 'js', limit: 1990 }), {
            storeAsResponseForUser: {
                message: context.message.id,
                user: context.message.author.id
            }
        })
    }
}