using CLMS.Framework.Data;
using CLMS.Framework.Data.DAL;
using CLMS.Framework.Identity;
using CLMS.Framework.Workflow;
using NHibernate;
using System;

namespace CLMS.Framework.Auditing.DAL
{
    public class RepositoryBuilder : IRepositoryBuilder
    {
        private readonly ISessionFactory _factory;

        public RepositoryBuilder(ISessionFactory factory)
        {
            _factory = factory;
        }

        public IAuditingRepository CreateAuditingRepository(IMiniSessionService sessionManager = null)
        {
            var session = _factory.OpenSession();
            session.FlushMode = FlushMode.Manual;
            return new Repository(session);
        }

        public ICreateRepository CreateCreateRepository(MiniSessionService manager = null)
        {
            return CreateCreateRepository((IMiniSessionService) manager);
        }

        public ICreateRepository CreateCreateRepository(IMiniSessionService sessionManager)
        {
            var session = _factory.OpenSession();
            session.FlushMode = FlushMode.Manual;
            return new Repository(session);
        }

        public IDeleteRepository CreateDeleteRepository(MiniSessionService manager = null)
        {
            throw new NotImplementedException();
        }

        public IDeleteRepository CreateDeleteRepository(IMiniSessionService manager)
        {
            throw new NotImplementedException();
        }

        public IIdentityRepository CreateIdentityRepository(MiniSessionService sessionManager = null)
        {
            throw new NotImplementedException();
        }

        public IIdentityRepository CreateIdentityRepository(IMiniSessionService sessionManager)
        {
            throw new NotImplementedException();
        }

        public IRetrieveRepository CreateRetrieveRepository(MiniSessionService manager = null)
        {
            throw new NotImplementedException();
        }

        public IRetrieveRepository CreateRetrieveRepository(IMiniSessionService manager)
        {
            throw new NotImplementedException();
        }

        public IUpdateRepository CreateUpdateRepository(MiniSessionService manager = null)
        {
            throw new NotImplementedException();
        }

        public IUpdateRepository CreateUpdateRepository(IMiniSessionService manager)
        {
            throw new NotImplementedException();
        }

        public IWorkflowRepository CreateWorkflowRepository(MiniSessionService manager = null)
        {
            throw new NotImplementedException();
        }

        public IWorkflowRepository CreateWorkflowRepository(IMiniSessionService manager)
        {
            throw new NotImplementedException();
        }
    }
}
