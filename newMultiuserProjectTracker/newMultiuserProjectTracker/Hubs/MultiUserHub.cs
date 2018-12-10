using Microsoft.AspNetCore.SignalR;
using System.Threading;
using System.Threading.Tasks;

namespace newMultiuserProjectTracker.Hubs
{
    public class MultiUserHub : Hub
    {
        public async Task CreateGroup(string name)
        {
            //TODO: put data in database

            //await Clients.Caller.SendAsync("NewGroupPage", name);
            await Clients.Caller.SendAsync("NewGroupPage", name);
        }

    }
}