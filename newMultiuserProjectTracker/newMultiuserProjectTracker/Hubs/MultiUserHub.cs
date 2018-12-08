using Microsoft.AspNetCore.SignalR;
using System.Threading;
using System.Threading.Tasks;

namespace newMultiuserProjectTracker.Hubs
{
    public class MultiUserHub : Hub
    {
        private static int bearTally = 0, beetsTally = 0, battlestarTally = 0;

        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }

        public async Task SendResults(bool bears, bool beets, bool battlestar)
        {
            if (bears)
                bearTally++;
            if (beets)
                beetsTally++;
            if (battlestar)
                battlestarTally++;

            await Clients.All.SendAsync("ReceiveResults", bearTally, beetsTally, battlestarTally);
        }

    }
}