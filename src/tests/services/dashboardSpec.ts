import { DashboardQueries } from '../../services/dashboard';

describe("Dashboard Model", () => {

    const dashboard = new DashboardQueries();

    it('should test five Most Expensive method', () => {
        expect(dashboard.fiveMostExpensive).toBeDefined();
    });

    it('should test products In Orders method', () => {
        expect(dashboard.productsInOrders).toBeDefined();
    });

    it('should test top Products method', () => {
        expect(dashboard.topProducts).toBeDefined();
    });

    it('should test users With Orders method', () => {
        expect(dashboard.usersWithOrders).toBeDefined();
    });
});