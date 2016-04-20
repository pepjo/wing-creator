/* eslint-disable */

export default `<?xml version='1.0' encoding='utf-8'?>
<Kratos_KMat_DB version="1.1.8">
    <Materials>
        <MaterialGroup id="Metal" pid="Solid" icon="grey.gif" help="Helptext" open="1">
            <Material id="Steel_AISI1059" pid="Steel_AISI1059" icon="grey.gif" help="Helptext" open="0">
                <Container id="General" pid="General" icon="prop.gif" class="normal" help="General" open="0">
                    <Property id="Description" pid="Description" value="High Carbon Steel" unit=" " icon="prop.gif" state="normal" help="Helptext" open="0"/>
                    <Property id="Density" pid="Density" value="7870" unit=" " icon="prop.gif" state="normal" help="Helptext" open="0"/>
                </Container>
                <Container id="Structural" pid="Structural" icon="prop.gif" class="normal" help="General" open="0">
                    <Container id="Elastic" pid="Elasticity" icon="prop.gif" class="normal" help="General" open="0">
                        <Container id="Isotropic" pid="Isotropic" icon="prop.gif" class="normal" help="General" open="0">
                            <Property id="YoungModulus" pid="Young modulus" value="200.0e9" unit=" " icon="prop.gif" state="normal" help="Helptext" open="0"/>
                            <Property id="ShearModulus" pid="Shear modulus" value="80e9" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                            <Property id="PoissonRatio" pid="Poisson ratio" value="0.29" unit=" " icon="prop.gif" state="normal" help="Helptext" open="0"/>
                        </Container>
                        <Container id="Orthotropic" pid="Orthotropic" icon="prop.gif" class="normal" state="hiddenAll" help="General" open="0">
                            <Property id="YoungModulusE11" pid="Young modulus E11" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                            <Property id="YoungModulusE22" pid="Young modulus E22" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                            <Property id="YoungModulusE33" pid="Young modulus E33" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                            <Property id="ShearModulusG12" pid="Shear modulus G12" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                            <Property id="ShearModulusG13" pid="Shear modulus G13" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                            <Property id="ShearModulusG23" pid="Shear modulus G23" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                            <Property id="PoissonRatiov12" pid="Poisson ratio v12" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                            <Property id="PoissonRatiov13" pid="Poisson ratio v13" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                            <Property id="PoissonRatiov23" pid="Poisson ratio v23" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                        </Container>
                        <Container id="Anisotropic" pid="Anisotropic" icon="prop.gif" state="hiddenAll" class="normal" help="General" open="0">
                            <Container id="MatrixA" pid="Matrix A" icon="prop.gif" state="hidden" class="normal" help="General" open="0">
                                <Property id="A11" pid="A11" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="A12" pid="A12" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="A13" pid="A13" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="A21" pid="A21" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="A22" pid="A22" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="A23" pid="A23" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="A31" pid="A31" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="A32" pid="A32" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="A33" pid="A33" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                            </Container>
                            <Container id="MatrixB" pid="Matrix B" icon="prop.gif" state="hidden" class="normal" help="General" open="0">
                                <Property id="B11" pid="B11" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="B12" pid="B12" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="B13" pid="B13" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="B21" pid="B21" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="B22" pid="B22" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="B23" pid="B23" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="B31" pid="B31" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="B32" pid="B32" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="B33" pid="B33" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                            </Container>
                            <Container id="MatrixD" pid="Matrix D" icon="prop.gif" state="hidden" class="normal" help="General" open="0">
                                <Property id="D11" pid="D11" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="D12" pid="D12" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="D13" pid="D13" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="D21" pid="D21" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="D22" pid="D22" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="D23" pid="D23" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="D31" pid="D31" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="D32" pid="D32" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="D33" pid="D33" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                            </Container>
                        </Container>
                    </Container>
                    <Container id="ElastoPlastic" pid="Plasticity" icon="prop.gif" class="normal" help="General" open="0">
                        <Property id="YieldCriterion" pid="Yield criterion" class="YieldCriteria" value="VonMises" ivalues="VonMises" values="Von-Mises" delvalues="Energy,Mohr-Coulomb,Rankine,Drucker-Prager,Tresca" unit=" " icon="prop.gif" help="Helptext" open="0"/>
                        <Property id="YieldStress" pid="Yield Stress" value="0.450e3" unit=" " icon="prop.gif" help="Helptext" open="0"/>
                        <Property id="InternalFrictionAngle" pid="Internal friction angle" YieldCriteria="Mohr-Coulomb,DruckerPrager" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                        <Property id="DilatancyAngle" pid="Dilatancy angle" YieldCriteria="Mohr-Coulomb,DruckerPrager" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                        <Property id="HardeningType" pid="Hardening law" class="HardeningLaw" value="Isotropic" ivalues="Isotropic,Kinematic,IsotropicKinematic" values="Isotropic,Kinematic,Isotropic + Kinematic" unit=" " icon="prop.gif" help="Helptext" open="0"/>
                        <Property id="IsotropicHardeningModulus" pid="Isotropic hardening modulus" HardeningLaw="Isotropic,IsotropicKinematic" value="0" unit=" " icon="prop.gif" help="Helptext" open="0"/>
                        <Property id="KinematicHardeningModulus" pid="Kinematic hardening modulus" HardeningLaw="Kinematic,IsotropicKinematic" value="0.12924e3" unit=" " icon="prop.gif" help="Helptext" open="0"/>
                        <Property id="SaturationLaw" pid="Saturation law" class="SaturationLaw" value="None" ivalues="None,Linear,Exponential" values="None,Linear,Exponential" unit=" " icon="prop.gif" help="Helptext" open="0"/>
                        <Property id="HardeningExponent" pid="Hardening exponent" SaturationLaw="Exponential" value="16.93" unit=" " icon="prop.gif" help="Helptext" open="0"/>
                        <Property id="ReferenceHardeningModulus" pid="Reference hardening modulus" SaturationLaw="Linear,Exponential" value="0.450e3" unit=" " icon="prop.gif" help="Helptext" open="0"/>
                        <Property id="InfinityHardeningModulus" pid="Infinity hardening modulus" SaturationLaw="Linear,Exponential" value="0.715e3" unit=" " icon="prop.gif" help="Helptext" open="0"/>
                        <Property id="FlowRule" pid="Flow rule" class="FlowRule" value="Linear" ivalues="Linear,Non-Linear" values="Linear,Non-Linear" unit=" " icon="prop.gif" help="Helptext" open="0"/>
                        <Property id="ImplicitIteration" pid="Backward Euler iterations" FlowRule="Non-Linear" value="30" unit=" " icon="prop.gif" help="Helptext" open="0"/>
                    </Container>
                    <Container id="Damage" pid="Damage" icon="prop.gif" state="hiddenAll" class="normal" help="General" open="0">
                        <Property id="DSofteningLaw" pid="Softening law" class="SofteningLaw" value="Linear" ivalues="Linear,Exponential" values="Linear,Exponential" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                        <Property id="DTensileStrength" pid="Tensile strength" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                        <Property id="DCompressiveStrength" pid="Compressive strength" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                        <Property id="DTensileFractureEnergy" pid="Tensile fracture energy" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                        <Property id="DCompressiveFractureEnergy" pid="Compressive fracture energy" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                    </Container>
                </Container>
                <Container id="Thermal" pid="Thermal" icon="prop.gif" state="normal" class="normal" help="General" open="0">
                    <Container id="Isotropic" pid="Isotropic" icon="prop.gif" state="normal" class="normal" help="General" open="0">
                        <Property id="ExpansionCoeff" pid="Expansion coeff" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                        <Property id="Conductivity" pid="Conductivity" value="54.0" unit=" " icon="prop.gif" state="normal" help="Helptext" open="0"/>
                        <Property id="SpecificHeat" pid="Specific heat" value="465.0" unit=" " icon="prop.gif" state="normal" help="Helptext" open="0"/>
                    </Container>
                    <Container id="Orthotropic" pid="Orthotropic" icon="prop.gif" state="hidden" class="normal" help="General" open="0">
                        <Property id="K11" pid="K11" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                        <Property id="K22" pid="K22" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                        <Property id="K33" pid="K33" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                        <Property id="alfa11" pid="alfa 11" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                        <Property id="alfa22" pid="alfa 22" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                        <Property id="alfa33" pid="alfa 33" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                    </Container>
                </Container>
                <Container id="Fluid" pid="Fluid" icon="prop.gif" class="normal" help="General" open="0">
                    <Property id="NonNewtonianFluid" pid="Non-Newtonian fluid" class="NonNewtonianFluid" value="No" ivalues="Yes,No" values="Yes,No" icon="prop.gif" state="normal" help="Non-Newtonian fluid option"/>
                    <Property id="Viscosity" pid="Viscosity" NonNewtonianFluid="No" value="0" unit=" " icon="prop.gif" state="normal" help="Helptext" open="0"/>
                    <Property id="PlasticViscosity" pid="Plastic viscosity" value="0.001" unit=" " NonNewtonianFluid="Yes" icon="prop.gif" state="normal" help="Define the plastic viscosity value"/>
                    <Property id="BulkModulus" pid="Bulk Modulus" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                    <Property id="BinghamSmoother" pid="Bingham smoother" value="500.0" NonNewtonianFluid="Yes" unit=" " icon="prop.gif" state="normal" help="Define the Bingham smoother value"/>
                    <Property id="YieldStress" pid="Yield stress" value="0.0" unit=" " NonNewtonianFluid="Yes" icon="prop.gif" state="normal" help="Define the yield stress value"/>
                </Container>
                <Container id="Electromagnetic" pid="Electromagnetic" icon="prop.gif" state="hiddenAll" class="normal" help="General" open="0">
                    <Property id="MagneticPermeability" pid="Magnetic permeability" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                    <Property id="ElectricalPermitivity" pid="Electrical permitivity" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                </Container>
            </Material>
            <Material id="Aluminium_7021" pid="Aluminium_7021" icon="grey.gif" help="Helptext" open="0">
                <Container id="General" pid="General" icon="prop.gif" class="normal" help="General" open="0">
                    <Property id="Description" pid="Description" value="Aluminium 7021-T62" unit=" " icon="prop.gif" state="normal" help="Helptext" open="1"/>
                    <Property id="Density" pid="Density" value="2780" unit=" " icon="prop.gif" state="normal" help="Helptext" open="0"/>
                </Container>
                <Container id="Structural" pid="Structural" icon="prop.gif" class="normal" help="General" open="0">
                    <Container id="Elastic" pid="Elasticity" icon="prop.gif" class="normal" help="General" open="0">
                        <Container id="Isotropic" pid="Isotropic" icon="prop.gif" class="normal" help="General" open="0">
                            <Property id="YoungModulus" pid="Young modulus" value="72e9" unit=" " icon="prop.gif" state="normal" help="Helptext" open="0"/>
                            <Property id="ShearModulus" pid="Shear modulus" value="27e9" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                            <Property id="PoissonRatio" pid="Poisson ratio" value="0.33" unit=" " icon="prop.gif" state="normal" help="Helptext" open="0"/>
                        </Container>
                        <Container id="Orthotropic" pid="Orthotropic" icon="prop.gif" state="hiddenAll" class="normal" help="General" open="0">
                            <Property id="YoungModulusE11" pid="Young modulus E11" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                            <Property id="YoungModulusE22" pid="Young modulus E22" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                            <Property id="YoungModulusE33" pid="Young modulus E33" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                            <Property id="ShearModulusG12" pid="Shear modulus G12" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                            <Property id="ShearModulusG13" pid="Shear modulus G13" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                            <Property id="ShearModulusG23" pid="Shear modulus G23" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                            <Property id="PoissonRatiov12" pid="Poisson ratio v12" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                            <Property id="PoissonRatiov13" pid="Poisson ratio v13" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                            <Property id="PoissonRatiov23" pid="Poisson ratio v23" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                        </Container>
                        <Container id="Anisotropic" pid="Anisotropic" icon="prop.gif" state="hiddenAll" class="normal" help="General" open="0">
                            <Container id="MatrixA" pid="Matrix A" icon="prop.gif" state="hidden" class="normal" help="General" open="0">
                                <Property id="A11" pid="A11" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="A12" pid="A12" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="A13" pid="A13" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="A21" pid="A21" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="A22" pid="A22" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="A23" pid="A23" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="A31" pid="A31" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="A32" pid="A32" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="A33" pid="A33" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                            </Container>
                            <Container id="MatrixB" pid="Matrix B" icon="prop.gif" state="hidden" class="normal" help="General" open="0">
                                <Property id="B11" pid="B11" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="B12" pid="B12" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="B13" pid="B13" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="B21" pid="B21" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="B22" pid="B22" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="B23" pid="B23" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="B31" pid="B31" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="B32" pid="B32" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="B33" pid="B33" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                            </Container>
                            <Container id="MatrixD" pid="Matrix D" icon="prop.gif" state="hidden" class="normal" help="General" open="0">
                                <Property id="D11" pid="D11" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="D12" pid="D12" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="D13" pid="D13" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="D21" pid="D21" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="D22" pid="D22" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="D23" pid="D23" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="D31" pid="D31" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="D32" pid="D32" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="D33" pid="D33" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                            </Container>
                        </Container>
                    </Container>
                    <Container id="ElastoPlastic" pid="Plasticity" icon="prop.gif" class="normal" help="General" open="0">
                        <Property id="YieldCriterion" pid="Yield criterion" class="YieldCriteria" value="VonMises" ivalues="VonMises" values="Von-Mises" delvalues="Energy,Mohr-Coulomb,Rankine,Drucker-Prager,Tresca" unit=" " icon="prop.gif" help="Helptext" open="0"/>
                        <Property id="YieldStress" pid="Yield Stress" value="0" unit=" " icon="prop.gif" help="Helptext" open="0"/>
                        <Property id="InternalFrictionAngle" pid="Internal friction angle" YieldCriteria="Mohr-Coulomb,DruckerPrager" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                        <Property id="DilatancyAngle" pid="Dilatancy angle" YieldCriteria="Mohr-Coulomb,DruckerPrager" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                        <Property id="HardeningType" pid="Hardening law" class="HardeningLaw" value="Isotropic" ivalues="Isotropic,Kinematic,IsotropicKinematic" values="Isotropic,Kinematic,Isotropic + Kinematic" unit=" " icon="prop.gif" help="Helptext" open="0"/>
                        <Property id="IsotropicHardeningModulus" pid="Isotropic hardening modulus" HardeningLaw="Isotropic,IsotropicKinematic" value="0" unit=" " icon="prop.gif" help="Helptext" open="0"/>
                        <Property id="KinematicHardeningModulus" pid="Kinematic hardening modulus" HardeningLaw="Kinematic,IsotropicKinematic" value="0" unit=" " icon="prop.gif" help="Helptext" open="0"/>
                        <Property id="SaturationLaw" pid="Saturation law" class="SaturationLaw" value="None" ivalues="None,Linear,Exponential" values="None,Linear,Exponential" unit=" " icon="prop.gif" help="Helptext" open="0"/>
                        <Property id="HardeningExponent" pid="Hardening exponent" SaturationLaw="Exponential" value="0" unit=" " icon="prop.gif" help="Helptext" open="0"/>
                        <Property id="ReferenceHardeningModulus" pid="Reference hardening modulus" SaturationLaw="Linear,Exponential" value="0" unit=" " icon="prop.gif" help="Helptext" open="0"/>
                        <Property id="InfinityHardeningModulus" pid="Infinity hardening modulus" SaturationLaw="Linear,Exponential" value="0" unit=" " icon="prop.gif" help="Helptext" open="0"/>
                        <Property id="FlowRule" pid="Flow rule" class="FlowRule" value="Linear" ivalues="Linear,Non-Linear" values="Linear,Non-Linear" unit=" " icon="prop.gif" help="Helptext" open="0"/>
                        <Property id="ImplicitIteration" pid="Backward Euler iterations" FlowRule="Non-Linear" value="30" unit=" " icon="prop.gif" help="Helptext" open="0"/>
                    </Container>
                    <Container id="Damage" pid="Damage" icon="prop.gif" state="hiddenAll" class="normal" help="General" open="0">
                        <Property id="SofteningLaw" pid="Softening law" class="SofteningLaw" value="Linear" ivalues="Linear,Exponential" values="Linear,Exponential" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                        <Property id="TensileStrength" pid="Tensile strength" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                        <Property id="CompressiveStrength" pid="Compressive strength" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                        <Property id="TensileFractureEnergy" pid="Tensile fracture energy" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                        <Property id="CompressiveFractureEnergy" pid="Compressive fracture energy" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                    </Container>
                </Container>
                <Container id="Thermal" pid="Thermal" icon="prop.gif" state="normal" class="normal" help="General" open="0">
                    <Container id="Isotropic" pid="Isotropic" icon="prop.gif" state="normal" class="normal" help="General" open="0">
                        <Property id="ExpansionCoeff" pid="Expansion coeff" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                        <Property id="Conductivity" pid="Conductivity" value="130.0" unit=" " icon="prop.gif" state="normal" help="Helptext" open="0"/>
                        <Property id="SpecificHeat" pid="Specific heat" value="1047.0" unit=" " icon="prop.gif" state="normal" help="Helptext" open="0"/>
                    </Container>
                    <Container id="Orthotropic" pid="Orthotropic" icon="prop.gif" state="hidden" class="normal" help="General" open="0">
                        <Property id="K11" pid="K11" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                        <Property id="K22" pid="K22" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                        <Property id="K33" pid="K33" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                        <Property id="alfa11" pid="alfa 11" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                        <Property id="alfa22" pid="alfa 22" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                        <Property id="alfa33" pid="alfa 33" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                    </Container>
                </Container>
                <Container id="Fluid" pid="Fluid" icon="prop.gif" class="normal" help="General" open="0">
                    <Property id="NonNewtonianFluid" pid="Non-Newtonian fluid" class="NonNewtonianFluid" value="No" ivalues="Yes,No" values="Yes,No" icon="prop.gif" state="normal" help="Non-Newtonian fluid option"/>
                    <Property id="Viscosity" pid="Viscosity" NonNewtonianFluid="No" value="0" unit=" " icon="prop.gif" state="normal" help="Helptext" open="0"/>
                    <Property id="PlasticViscosity" pid="Plastic viscosity" value="0.001" unit=" " NonNewtonianFluid="Yes" icon="prop.gif" state="normal" help="Define the plastic viscosity value"/>
                    <Property id="BulkModulus" pid="Bulk Modulus" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                    <Property id="BinghamSmoother" pid="Bingham smoother" value="500.0" NonNewtonianFluid="Yes" unit=" " icon="prop.gif" state="normal" help="Define the Bingham smoother value"/>
                    <Property id="YieldStress" pid="Yield stress" value="0.0" unit=" " NonNewtonianFluid="Yes" icon="prop.gif" state="normal" help="Define the yield stress value"/>
                </Container>
                <Container id="Electromagnetic" pid="Electromagnetic" icon="prop.gif" state="hiddenAll" class="normal" help="General" open="0">
                    <Property id="MagneticPermeability" pid="Magnetic permeability" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                    <Property id="ElectricalPermitivity" pid="Electrical permitivity" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                </Container>
            </Material>
        </MaterialGroup>
        <MaterialGroup id="Fluid" pid="Fluid" icon="blue.gif" help="Helptext" open="1">
            <Material id="Air" pid="Air" icon="blue.gif" help="Helptext" open="0">
                <Container id="General" pid="General" icon="prop.gif" class="normal" help="General" open="0">
                    <Property id="Description" pid="Description" value="Air" unit=" " icon="prop.gif" state="normal" help="Helptext" open="0"/>
                    <Property id="Density" pid="Density" value="1" unit=" " icon="prop.gif" state="normal" help="Helptext" open="0"/>
                </Container>
                <Container id="Structural" pid="Structural" icon="prop.gif" class="normal" help="General" open="0">
                    <Container id="Elastic" pid="Elasticity" icon="prop.gif" class="normal" help="General" open="0">
                        <Container id="Isotropic" pid="Isotropic" icon="prop.gif" class="normal" help="General" open="0">
                            <Property id="YoungModulus" pid="Young modulus" value="0" unit=" " icon="prop.gif" state="normal" help="Helptext" open="0"/>
                            <Property id="ShearModulus" pid="Shear modulus" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                            <Property id="PoissonRatio" pid="Poisson ratio" value="0" unit=" " icon="prop.gif" state="normal" help="Helptext" open="0"/>
                        </Container>
                        <Container id="Orthotropic" pid="Orthotropic" icon="prop.gif" state="hiddenAll" class="normal" help="General" open="0">
                            <Property id="YoungModulusE11" pid="Young modulus E11" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                            <Property id="YoungModulusE22" pid="Young modulus E22" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                            <Property id="YoungModulusE33" pid="Young modulus E33" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                            <Property id="ShearModulusG12" pid="Shear modulus G12" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                            <Property id="ShearModulusG13" pid="Shear modulus G13" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                            <Property id="ShearModulusG23" pid="Shear modulus G23" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                            <Property id="PoissonRatiov12" pid="Poisson ratio v12" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                            <Property id="PoissonRatiov13" pid="Poisson ratio v13" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                            <Property id="PoissonRatiov23" pid="Poisson ratio v23" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                        </Container>
                        <Container id="Anisotropic" pid="Anisotropic" icon="prop.gif" state="hiddenAll" class="normal" help="General" open="0">
                            <Container id="MatrixA" pid="Matrix A" icon="prop.gif" state="hidden" class="normal" help="General" open="0">
                                <Property id="A11" pid="A11" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="A12" pid="A12" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="A13" pid="A13" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="A21" pid="A21" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="A22" pid="A22" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="A23" pid="A23" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="A31" pid="A31" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="A32" pid="A32" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="A33" pid="A33" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                            </Container>
                            <Container id="MatrixB" pid="Matrix B" icon="prop.gif" state="hidden" class="normal" help="General" open="0">
                                <Property id="B11" pid="B11" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="B12" pid="B12" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="B13" pid="B13" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="B21" pid="B21" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="B22" pid="B22" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="B23" pid="B23" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="B31" pid="B31" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="B32" pid="B32" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="B33" pid="B33" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                            </Container>
                            <Container id="MatrixD" pid="Matrix D" icon="prop.gif" state="hidden" class="normal" help="General" open="0">
                                <Property id="D11" pid="D11" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="D12" pid="D12" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="D13" pid="D13" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="D21" pid="D21" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="D22" pid="D22" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="D23" pid="D23" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="D31" pid="D31" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="D32" pid="D32" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="D33" pid="D33" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                            </Container>
                        </Container>
                    </Container>
                    <Container id="ElastoPlastic" pid="Plasticity" icon="prop.gif" class="normal" help="General" open="0">
                        <Property id="YieldCriterion" pid="Yield criterion" class="YieldCriteria" value="VonMises" ivalues="VonMises" values="Von-Mises" delvalues="Energy,Mohr-Coulomb,Rankine,Drucker-Prager,Tresca" unit=" " icon="prop.gif" help="Helptext" open="0"/>
                        <Property id="YieldStress" pid="Yield Stress" value="0" unit=" " icon="prop.gif" help="Helptext" open="0"/>
                        <Property id="InternalFrictionAngle" pid="Internal friction angle" YieldCriteria="Mohr-Coulomb,DruckerPrager" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                        <Property id="DilatancyAngle" pid="Dilatancy angle" YieldCriteria="Mohr-Coulomb,DruckerPrager" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                        <Property id="HardeningType" pid="Hardening law" class="HardeningLaw" value="Isotropic" ivalues="Isotropic,Kinematic,IsotropicKinematic" values="Isotropic,Kinematic,Isotropic + Kinematic" unit=" " icon="prop.gif" help="Helptext" open="0"/>
                        <Property id="IsotropicHardeningModulus" pid="Isotropic hardening modulus" HardeningLaw="Isotropic,IsotropicKinematic" value="0" unit=" " icon="prop.gif" help="Helptext" open="0"/>
                        <Property id="KinematicHardeningModulus" pid="Kinematic hardening modulus" HardeningLaw="Kinematic,IsotropicKinematic" value="0" unit=" " icon="prop.gif" help="Helptext" open="0"/>
                        <Property id="SaturationLaw" pid="Saturation law" class="SaturationLaw" value="None" ivalues="None,Linear,Exponential" values="None,Linear,Exponential" unit=" " icon="prop.gif" help="Helptext" open="0"/>
                        <Property id="HardeningExponent" pid="Hardening exponent" SaturationLaw="Exponential" value="0" unit=" " icon="prop.gif" help="Helptext" open="0"/>
                        <Property id="ReferenceHardeningModulus" pid="Reference hardening modulus" SaturationLaw="Linear,Exponential" value="0" unit=" " icon="prop.gif" help="Helptext" open="0"/>
                        <Property id="InfinityHardeningModulus" pid="Infinity hardening modulus" SaturationLaw="Linear,Exponential" value="0" unit=" " icon="prop.gif" help="Helptext" open="0"/>
                        <Property id="FlowRule" pid="Flow rule" class="FlowRule" value="Linear" ivalues="Linear,Non-Linear" values="Linear,Non-Linear" unit=" " icon="prop.gif" help="Helptext" open="0"/>
                        <Property id="ImplicitIteration" pid="Backward Euler iterations" FlowRule="Non-Linear" value="30" unit=" " icon="prop.gif" help="Helptext" open="0"/>
                    </Container>
                    <Container id="Damage" pid="Damage" icon="prop.gif" state="hiddenAll" class="normal" help="General" open="0">
                        <Property id="SofteningLaw" pid="Softening law" class="SofteningLaw" value="Linear" ivalues="Linear,Exponential" values="Linear,Exponential" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                        <Property id="TensileStrength" pid="Tensile strength" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                        <Property id="CompressiveStrength" pid="Compressive strength" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                        <Property id="TensileFractureEnergy" pid="Tensile fracture energy" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                        <Property id="CompressiveFractureEnergy" pid="Compressive fracture energy" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                    </Container>
                </Container>
                <Container id="Thermal" pid="Thermal" icon="prop.gif" state="hiddenAll" class="normal" help="General" open="0">
                    <Container id="Isotropic" pid="Isotropic" icon="prop.gif" state="hidden" class="normal" help="General" open="0">
                        <Property id="ExpansionCoeff" pid="Expansion coeff" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                        <Property id="Conductivity" pid="Conductivity" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                        <Property id="SpecificHeat" pid="Specific heat" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                    </Container>
                    <Container id="Orthotropic" pid="Orthotropic" icon="prop.gif" state="hidden" class="normal" help="General" open="0">
                        <Property id="K11" pid="K11" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                        <Property id="K22" pid="K22" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                        <Property id="K33" pid="K33" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                        <Property id="alfa11" pid="alfa 11" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                        <Property id="alfa22" pid="alfa 22" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                        <Property id="alfa33" pid="alfa 33" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                    </Container>
                </Container>
                <Container id="Fluid" pid="Fluid" icon="prop.gif" class="normal" help="General" open="0">
                    <Property id="NonNewtonianFluid" pid="Non-Newtonian fluid" class="NonNewtonianFluid" value="No" ivalues="Yes,No" values="Yes,No" icon="prop.gif" state="normal" help="Non-Newtonian fluid option"/>
                    <Property id="Viscosity" pid="Viscosity" NonNewtonianFluid="No" value="15e-6" unit=" " icon="prop.gif" state="normal" help="Helptext" open="0"/>
                    <Property id="PlasticViscosity" pid="Plastic viscosity" value="0.001" unit=" " NonNewtonianFluid="Yes" icon="prop.gif" state="normal" help="Define the plastic viscosity value"/>
                    <Property id="BulkModulus" pid="Bulk Modulus" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                    <Property id="BinghamSmoother" pid="Bingham smoother" value="500.0" NonNewtonianFluid="Yes" unit=" " icon="prop.gif" state="normal" help="Define the Bingham smoother value"/>
                    <Property id="YieldStress" pid="Yield stress" value="0.0" unit=" " NonNewtonianFluid="Yes" icon="prop.gif" state="normal" help="Define the yield stress value"/>
                </Container>
                <Container id="Electromagnetic" pid="Electromagnetic" state="hiddenAll" icon="prop.gif" class="normal" help="General" open="0">
                    <Property id="MagneticPermeability" pid="Magnetic permeability" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                    <Property id="ElectricalPermitivity" pid="Electrical permitivity" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                </Container>
            </Material>
            <Material id="Water" pid="Water" icon="blue.gif" help="Helptext" open="0">
                <Container id="General" pid="General" icon="prop.gif" class="normal" help="General" open="0">
                    <Property id="Description" pid="Description" value="Water H2O" unit=" " icon="prop.gif" state="normal" help="Helptext" open="0"/>
                    <Property id="Density" pid="Density" value="1000.0" unit=" " icon="prop.gif" state="normal" help="Helptext" open="0"/>
                </Container>
                <Container id="Structural" pid="Structural" icon="prop.gif" class="normal" help="General" open="0">
                    <Container id="Elastic" pid="Elasticity" icon="prop.gif" class="normal" help="General" open="0">
                        <Container id="Isotropic" pid="Isotropic" icon="prop.gif" class="normal" help="General" open="0">
                            <Property id="YoungModulus" pid="Young modulus" value="0" unit=" " icon="prop.gif" state="normal" help="Helptext" open="0"/>
                            <Property id="ShearModulus" pid="Shear modulus" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                            <Property id="PoissonRatio" pid="Poisson ratio" value="0" unit=" " icon="prop.gif" state="normal" help="Helptext" open="0"/>
                        </Container>
                        <Container id="Orthotropic" pid="Orthotropic" icon="prop.gif" state="hiddenAll" class="normal" help="General" open="0">
                            <Property id="YoungModulusE11" pid="Young modulus E11" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                            <Property id="YoungModulusE22" pid="Young modulus E22" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                            <Property id="YoungModulusE33" pid="Young modulus E33" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                            <Property id="ShearModulusG12" pid="Shear modulus G12" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                            <Property id="ShearModulusG13" pid="Shear modulus G13" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                            <Property id="ShearModulusG23" pid="Shear modulus G23" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                            <Property id="PoissonRatiov12" pid="Poisson ratio v12" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                            <Property id="PoissonRatiov13" pid="Poisson ratio v13" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                            <Property id="PoissonRatiov23" pid="Poisson ratio v23" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                        </Container>
                        <Container id="Anisotropic" pid="Anisotropic" icon="prop.gif" state="hiddenAll" class="normal" help="General" open="0">
                            <Container id="MatrixA" pid="Matrix A" icon="prop.gif" state="hidden" class="normal" help="General" open="0">
                                <Property id="A11" pid="A11" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="A12" pid="A12" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="A13" pid="A13" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="A21" pid="A21" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="A22" pid="A22" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="A23" pid="A23" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="A31" pid="A31" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="A32" pid="A32" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="A33" pid="A33" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                            </Container>
                            <Container id="MatrixB" pid="Matrix B" icon="prop.gif" state="hidden" class="normal" help="General" open="0">
                                <Property id="B11" pid="B11" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="B12" pid="B12" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="B13" pid="B13" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="B21" pid="B21" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="B22" pid="B22" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="B23" pid="B23" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="B31" pid="B31" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="B32" pid="B32" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="B33" pid="B33" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                            </Container>
                            <Container id="MatrixD" pid="Matrix D" icon="prop.gif" state="hidden" class="normal" help="General" open="0">
                                <Property id="D11" pid="D11" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="D12" pid="D12" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="D13" pid="D13" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="D21" pid="D21" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="D22" pid="D22" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="D23" pid="D23" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="D31" pid="D31" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="D32" pid="D32" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="D33" pid="D33" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                            </Container>
                        </Container>
                    </Container>
                    <Container id="ElastoPlastic" pid="Plasticity" icon="prop.gif" class="normal" help="General" open="0">
                        <Property id="YieldCriterion" pid="Yield criterion" class="YieldCriteria" value="VonMises" ivalues="VonMises" values="Von-Mises" delvalues="Energy,Mohr-Coulomb,Rankine,Drucker-Prager,Tresca" unit=" " icon="prop.gif" help="Helptext" open="0"/>
                        <Property id="YieldStress" pid="Yield Stress" value="0" unit=" " icon="prop.gif" help="Helptext" open="0"/>
                        <Property id="InternalFrictionAngle" pid="Internal friction angle" YieldCriteria="Mohr-Coulomb,DruckerPrager" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                        <Property id="DilatancyAngle" pid="Dilatancy angle" YieldCriteria="Mohr-Coulomb,DruckerPrager" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                        <Property id="HardeningType" pid="Hardening law" class="HardeningLaw" value="Isotropic" ivalues="Isotropic,Kinematic,IsotropicKinematic" values="Isotropic,Kinematic,Isotropic + Kinematic" unit=" " icon="prop.gif" help="Helptext" open="0"/>
                        <Property id="IsotropicHardeningModulus" pid="Isotropic hardening modulus" HardeningLaw="Isotropic,IsotropicKinematic" value="0" unit=" " icon="prop.gif" help="Helptext" open="0"/>
                        <Property id="KinematicHardeningModulus" pid="Kinematic hardening modulus" HardeningLaw="Kinematic,IsotropicKinematic" value="0" unit=" " icon="prop.gif" help="Helptext" open="0"/>
                        <Property id="SaturationLaw" pid="Saturation law" class="SaturationLaw" value="None" ivalues="None,Linear,Exponential" values="None,Linear,Exponential" unit=" " icon="prop.gif" help="Helptext" open="0"/>
                        <Property id="HardeningExponent" pid="Hardening exponent" SaturationLaw="Exponential" value="0" unit=" " icon="prop.gif" help="Helptext" open="0"/>
                        <Property id="ReferenceHardeningModulus" pid="Reference hardening modulus" SaturationLaw="Linear,Exponential" value="0" unit=" " icon="prop.gif" help="Helptext" open="0"/>
                        <Property id="InfinityHardeningModulus" pid="Infinity hardening modulus" SaturationLaw="Linear,Exponential" value="0" unit=" " icon="prop.gif" help="Helptext" open="0"/>
                        <Property id="FlowRule" pid="Flow rule" class="FlowRule" value="Linear" ivalues="Linear,Non-Linear" values="Linear,Non-Linear" unit=" " icon="prop.gif" help="Helptext" open="0"/>
                        <Property id="ImplicitIteration" pid="Backward Euler iterations" FlowRule="Non-Linear" value="30" unit=" " icon="prop.gif" help="Helptext" open="0"/>
                    </Container>
                    <Container id="Damage" pid="Damage" icon="prop.gif" state="hiddenAll" class="normal" help="General" open="0">
                        <Property id="SofteningLaw" pid="Softening law" class="SofteningLaw" value="Linear" ivalues="Linear,Exponential" values="Linear,Exponential" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                        <Property id="TensileStrength" pid="Tensile strength" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                        <Property id="CompressiveStrength" pid="Compressive strength" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                        <Property id="TensileFractureEnergy" pid="Tensile fracture energy" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                        <Property id="CompressiveFractureEnergy" pid="Compressive fracture energy" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                    </Container>
                </Container>
                <Container id="Thermal" pid="Thermal" icon="prop.gif" state="hiddenAll" class="normal" help="General" open="0">
                    <Container id="Isotropic" pid="Isotropic" icon="prop.gif" state="hidden" class="normal" help="General" open="0">
                        <Property id="ExpansionCoeff" pid="Expansion coeff" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                        <Property id="Conductivity" pid="Conductivity" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                        <Property id="SpecificHeat" pid="Specific heat" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                    </Container>
                    <Container id="Orthotropic" pid="Orthotropic" icon="prop.gif" state="hidden" class="normal" help="General" open="0">
                        <Property id="K11" pid="K11" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                        <Property id="K22" pid="K22" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                        <Property id="K33" pid="K33" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                        <Property id="alfa11" pid="alfa 11" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                        <Property id="alfa22" pid="alfa 22" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                        <Property id="alfa33" pid="alfa 33" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                    </Container>
                </Container>
                <Container id="Fluid" pid="Fluid" icon="prop.gif" class="normal" help="General" open="1">
                    <Property id="NonNewtonianFluid" pid="Non-Newtonian fluid" class="NonNewtonianFluid" value="No" ivalues="Yes,No" values="Yes,No" icon="prop.gif" state="normal" help="Non-Newtonian fluid option"/>
                    <Property id="Viscosity" pid="Kinematic viscosity" NonNewtonianFluid="No" value="1e-6" unit=" " icon="prop.gif" state="normal" help="Helptext" open="0"/>
                    <Property id="PlasticViscosity" pid="Plastic viscosity" value="0.001" unit=" " NonNewtonianFluid="Yes" icon="prop.gif" state="normal" help="Define the plastic viscosity value"/>
                    <Property id="BulkModulus" pid="Bulk Modulus" value="2.2e9" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                    <Property id="BinghamSmoother" pid="Bingham smoother" value="500.0" NonNewtonianFluid="Yes" unit=" " icon="prop.gif" state="normal" help="Define the Bingham smoother value"/>
                    <Property id="YieldStress" pid="Yield stress" value="0.0" unit=" " NonNewtonianFluid="Yes" icon="prop.gif" state="normal" help="Define the yield stress value"/>
                </Container>
                <Container id="Electromagnetic" pid="Electromagnetic" state="hiddenAll" icon="prop.gif" class="normal" help="General" open="0">
                    <Property id="MagneticPermeability" pid="Magnetic permeability" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                    <Property id="ElectricalPermitivity" pid="Electrical permitivity" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                </Container>
            </Material>
        </MaterialGroup>
        <MaterialGroup id="Plastic" pid="Plastic" state="hidden" icon="red.gif" help="Helptext" open="1"/>
        <MaterialGroup id="Composite" pid="Composite" icon="green.gif" help="Helptext" open="1">
            <Material id="HexPly_8551-7_IM7" pid="HexPly_8551-7_IM7" icon="green.gif" help="Composite1" open="0">
                <Container id="General" pid="General" icon="prop.gif" class="normal" help="General" open="1">
                    <Property id="Description" pid="Description" value="Hexcel HexPly 8551-7 Epoxy Matrix, IM7 Fiber, 60% Fiber Volume" unit=" " icon="prop.gif" state="normal" help="Helptext" open="0"/>
                    <Property id="Density" pid="Density" value="1577" unit=" " icon="prop.gif" state="normal" help="Helptext" open="0"/>
                </Container>
                <Container id="Structural" pid="Structural" icon="prop.gif" class="normal" help="General" open="0">
                    <Container id="Elastic" pid="Elasticity" icon="prop.gif" class="normal" help="General" open="0">
                        <Container id="Isotropic" pid="Isotropic" icon="prop.gif" class="normal" help="General" open="0">
                            <Property id="YoungModulus" pid="Young modulus" value="0" unit=" " icon="prop.gif" state="normal" help="Helptext" open="0"/>
                            <Property id="ShearModulus" pid="Shear modulus" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                            <Property id="PoissonRatio" pid="Poisson ratio" value="0" unit=" " icon="prop.gif" state="normal" help="Helptext" open="0"/>
                        </Container>
                        <Container id="Orthotropic" pid="Orthotropic" icon="prop.gif" state="hiddenAll" class="normal" help="General" open="0">
                            <Property id="YoungModulusE11" pid="Young modulus E11" value="159e9" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                            <Property id="YoungModulusE22" pid="Young modulus E22" value="8.34e9" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                            <Property id="YoungModulusE33" pid="Young modulus E33" value="8.34e9" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                            <Property id="ShearModulusG12" pid="Shear modulus G12" value="5.86e9" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                            <Property id="ShearModulusG13" pid="Shear modulus G13" value="5.86e9" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                            <Property id="ShearModulusG23" pid="Shear modulus G23" value="5.86e9" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                            <Property id="PoissonRatiov12" pid="Poisson ratio v12" value="0.22" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                            <Property id="PoissonRatiov13" pid="Poisson ratio v13" value="0.22" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                            <Property id="PoissonRatiov23" pid="Poisson ratio v23" value="0.22" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                        </Container>
                        <Container id="Anisotropic" pid="Anisotropic" icon="prop.gif" state="hiddenAll" class="normal" help="General" open="0">
                            <Container id="MatrixA" pid="Matrix A" icon="prop.gif" state="hidden" class="normal" help="General" open="0">
                                <Property id="A11" pid="A11" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="A12" pid="A12" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="A13" pid="A13" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="A21" pid="A21" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="A22" pid="A22" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="A23" pid="A23" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="A31" pid="A31" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="A32" pid="A32" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="A33" pid="A33" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                            </Container>
                            <Container id="MatrixB" pid="Matrix B" icon="prop.gif" state="hidden" class="normal" help="General" open="0">
                                <Property id="B11" pid="B11" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="B12" pid="B12" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="B13" pid="B13" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="B21" pid="B21" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="B22" pid="B22" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="B23" pid="B23" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="B31" pid="B31" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="B32" pid="B32" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="B33" pid="B33" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                            </Container>
                            <Container id="MatrixD" pid="Matrix D" icon="prop.gif" state="hidden" class="normal" help="General" open="0">
                                <Property id="D11" pid="D11" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="D12" pid="D12" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="D13" pid="D13" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="D21" pid="D21" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="D22" pid="D22" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="D23" pid="D23" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="D31" pid="D31" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="D32" pid="D32" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                                <Property id="D33" pid="D33" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                            </Container>
                        </Container>
                    </Container>
                    <Container id="ElastoPlastic" pid="Plasticity" icon="prop.gif" class="normal" help="General" open="0">
                        <Property id="YieldCriterion" pid="Yield criterion" class="YieldCriteria" value="VonMises" ivalues="VonMises" values="Von-Mises" delvalues="Energy,Mohr-Coulomb,Rankine,Drucker-Prager,Tresca" unit=" " icon="prop.gif" help="Helptext" open="0"/>
                        <Property id="YieldStress" pid="Yield Stress" value="0" unit=" " icon="prop.gif" help="Helptext" open="0"/>
                        <Property id="InternalFrictionAngle" pid="Internal friction angle" YieldCriteria="Mohr-Coulomb,DruckerPrager" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                        <Property id="DilatancyAngle" pid="Dilatancy angle" YieldCriteria="Mohr-Coulomb,DruckerPrager" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                        <Property id="HardeningType" pid="Hardening law" class="HardeningLaw" value="Isotropic" ivalues="Isotropic,Kinematic,IsotropicKinematic" values="Isotropic,Kinematic,Isotropic + Kinematic" unit=" " icon="prop.gif" help="Helptext" open="0"/>
                        <Property id="IsotropicHardeningModulus" pid="Isotropic hardening modulus" HardeningLaw="Isotropic,IsotropicKinematic" value="0" unit=" " icon="prop.gif" help="Helptext" open="0"/>
                        <Property id="KinematicHardeningModulus" pid="Kinematic hardening modulus" HardeningLaw="Kinematic,IsotropicKinematic" value="0" unit=" " icon="prop.gif" help="Helptext" open="0"/>
                        <Property id="SaturationLaw" pid="Saturation law" class="SaturationLaw" value="None" ivalues="None,Linear,Exponential" values="None,Linear,Exponential" unit=" " icon="prop.gif" help="Helptext" open="0"/>
                        <Property id="HardeningExponent" pid="Hardening exponent" SaturationLaw="Exponential" value="0" unit=" " icon="prop.gif" help="Helptext" open="0"/>
                        <Property id="ReferenceHardeningModulus" pid="Reference hardening modulus" SaturationLaw="Linear,Exponential" value="0" unit=" " icon="prop.gif" help="Helptext" open="0"/>
                        <Property id="InfinityHardeningModulus" pid="Infinity hardening modulus" SaturationLaw="Linear,Exponential" value="0" unit=" " icon="prop.gif" help="Helptext" open="0"/>
                        <Property id="FlowRule" pid="Flow rule" class="FlowRule" value="Linear" ivalues="Linear,Non-Linear" values="Linear,Non-Linear" unit=" " icon="prop.gif" help="Helptext" open="0"/>
                        <Property id="ImplicitIteration" pid="Backward Euler iterations" FlowRule="Non-Linear" value="30" unit=" " icon="prop.gif" help="Helptext" open="0"/>
                    </Container>
                    <Container id="Damage" pid="Damage" icon="prop.gif" state="hiddenAll" class="normal" help="General" open="0">
                        <Property id="SofteningLaw" pid="Softening law" class="SofteningLaw" value="Linear" values="Linear,Exponential" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                        <Property id="TensileStrength" pid="Tensile strength" value="2760e6" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                        <Property id="CompressiveStrength" pid="Compressive strength" value="1620e06" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                        <Property id="TensileFractureEnergy" pid="Tensile fracture energy" value="27.6" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                        <Property id="CompressiveFractureEnergy" pid="Compressive fracture energy" value="276" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                    </Container>
                </Container>
                <Container id="Thermal" pid="Thermal" icon="prop.gif" state="normal" class="normal" help="General" open="0">
                    <Container id="Isotropic" pid="Isotropic" icon="prop.gif" state="normal" class="normal" help="General" open="0">
                        <Property id="ExpansionCoeff" pid="Expansion coeff" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                        <Property id="Conductivity" pid="Conductivity" value="0" unit=" " icon="prop.gif" state="normal" help="Helptext" open="0"/>
                        <Property id="SpecificHeat" pid="Specific heat" value="0" unit=" " icon="prop.gif" state="normal" help="Helptext" open="0"/>
                    </Container>
                    <Container id="Orthotropic" pid="Orthotropic" icon="prop.gif" state="hidden" class="normal" help="General" open="0">
                        <Property id="K11" pid="K11" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                        <Property id="K22" pid="K22" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                        <Property id="K33" pid="K33" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                        <Property id="alfa11" pid="alfa 11" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                        <Property id="alfa22" pid="alfa 22" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                        <Property id="alfa33" pid="alfa 33" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                    </Container>
                </Container>
                <Container id="Fluid" pid="Fluid" icon="prop.gif" class="normal" help="General" open="0">
                    <Property id="NonNewtonianFluid" pid="Non-Newtonian fluid" class="NonNewtonianFluid" value="No" ivalues="Yes,No" values="Yes,No" icon="prop.gif" state="normal" help="Non-Newtonian fluid option"/>
                    <Property id="Viscosity" pid="Viscosity" NonNewtonianFluid="No" value="0" unit=" " icon="prop.gif" state="normal" help="Helptext" open="0"/>
                    <Property id="PlasticViscosity" pid="Plastic viscosity" value="0.001" unit=" " NonNewtonianFluid="Yes" icon="prop.gif" state="normal" help="Define the plastic viscosity value"/>
                    <Property id="BulkModulus" pid="Bulk Modulus" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                    <Property id="BinghamSmoother" pid="Bingham smoother" value="500.0" NonNewtonianFluid="Yes" unit=" " icon="prop.gif" state="normal" help="Define the Bingham smoother value"/>
                    <Property id="YieldStress" pid="Yield stress" value="0.0" unit=" " NonNewtonianFluid="Yes" icon="prop.gif" state="normal" help="Define the yield stress value"/>
                </Container>
                <Container id="Electromagnetic" pid="Electromagnetic" state="hiddenAll" icon="prop.gif" class="normal" help="General" open="0">
                    <Property id="MagneticPermeability" pid="Magnetic permeability" value="0" unit=" " icon="prop.gif" state="normal" help="Helptext" open="0"/>
                    <Property id="ElectricalPermitivity" pid="Electrical permitivity" value="0" unit=" " icon="prop.gif" state="normal" help="Helptext" open="0"/>
                </Container>
            </Material>
        </MaterialGroup>
        <MaterialGroup id="DEMMaterial" pid="DEM" icon="grey.gif" help="DEM material" open="1">
            <Material id="DEM-DefaultMaterial" pid="DEM-DefaultMaterial" icon="grey.gif" help="Material name" open="0">
                <Property id="Density" pid="Density" value="2300.0" unit=" " icon="prop.gif" state="normal" help="Density" open="0"/>
                <Property id="YoungModulus" pid="Young modulus" value="1.0e5" unit=" " icon="prop.gif" state="normal" help="Helptext" open="0"/>
                <Property id="PoissonRatio" pid="Poisson ratio" value="0.20" unit=" " icon="prop.gif" state="normal" help="Helptext" open="0"/>
                <Property id="ParticleDiameter" pid="Diameter" value="0.002" unit=" " icon="prop.gif" state="normal" help="Particle diameter" open="0"/>
                <Property id="ParticleSphericity" pid="Sphericity" value="1.0" unit=" " icon="prop.gif" state="normal" help="Particle sphericity" open="0"/>
                <Property id="ParticleFrictionAngle" pid="Friction angle" value="45.0" unit=" " icon="prop.gif" state="normal" help="Particle friction angle" open="0"/>
                <Property id="RestitutionCoefficient" pid="Restitution coefficient" value="0.0" unit=" " icon="prop.gif" state="normal" help="Restitution coefficient" open="0"/>
                <Property id="RollingFriction" pid="Rolling friction" value="0.0" unit=" " icon="prop.gif" state="normal" help="Rolling friction" open="0"/>
                <Property id="RotationalDampingRatio" pid="Rotational damping ratio" value="0.5" unit=" " icon="prop.gif" state="normal" help="Rotational damping ratio" open="0"/>
                <Property id="Color" pid="Color" value="1" unit=" " icon="prop.gif" state="normal" help="Color" open="0"/>
            </Material>
        </MaterialGroup>
        <ClassConfiguration>
            <Class>HardeningLaw,SaturationLaw,FlowRule,YieldCriteria,NonNewtonianFluid</Class>
        </ClassConfiguration>
    </Materials>
    <Units>
        <!-- Kratos unit properties -->
    </Units>
    <Templates>
        <Template id="NewMaterial" help="Helptext" open="1">
            <Container id="General" pid="General" icon="prop.gif" class="normal" help="General" open="1">
                <Property id="Description" pid="Description" value="material description" unit=" " icon="prop.gif" state="normal" help="Helptext" open="0"/>
                <Property id="Density" pid="Density" value="0" unit=" " icon="prop.gif" state="normal" help="Helptext" open="0"/>
            </Container>
            <Container id="Structural" pid="Structural" icon="prop.gif" class="normal" help="General" open="0">
                <Container id="Elastic" pid="Elasticity" icon="prop.gif" class="normal" help="General" open="0">
                    <Container id="Isotropic" pid="Isotropic" icon="prop.gif" class="normal" help="General" open="0">
                        <Property id="YoungModulus" pid="Young modulus" value="0" unit=" " icon="prop.gif" state="normal" help="Helptext" open="0"/>
                        <Property id="ShearModulus" pid="Shear modulus" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                        <Property id="PoissonRatio" pid="Poisson ratio" value="0" unit=" " icon="prop.gif" state="normal" help="Helptext" open="0"/>
                    </Container>
                    <Container id="Orthotropic" pid="Orthotropic" icon="prop.gif" state="hiddenAll" class="normal" help="General" open="0">
                        <Property id="YoungModulusE11" pid="Young modulus E11" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                        <Property id="YoungModulusE22" pid="Young modulus E22" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                        <Property id="YoungModulusE33" pid="Young modulus E33" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                        <Property id="ShearModulusG12" pid="Shear modulus G12" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                        <Property id="ShearModulusG13" pid="Shear modulus G13" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                        <Property id="ShearModulusG23" pid="Shear modulus G23" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                        <Property id="PoissonRatiov12" pid="Poisson ratio v12" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                        <Property id="PoissonRatiov13" pid="Poisson ratio v13" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                        <Property id="PoissonRatiov23" pid="Poisson ratio v23" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                    </Container>
                    <Container id="Anisotropic" pid="Anisotropic" icon="prop.gif" state="hiddenAll" class="normal" help="General" open="0">
                        <Container id="MatrixA" pid="Matrix A" icon="prop.gif" state="hidden" class="normal" help="General" open="0">
                            <Property id="A11" pid="A11" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                            <Property id="A12" pid="A12" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                            <Property id="A13" pid="A13" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                            <Property id="A21" pid="A21" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                            <Property id="A22" pid="A22" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                            <Property id="A23" pid="A23" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                            <Property id="A31" pid="A31" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                            <Property id="A32" pid="A32" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                            <Property id="A33" pid="A33" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                        </Container>
                        <Container id="MatrixB" pid="Matrix B" icon="prop.gif" state="hidden" class="normal" help="General" open="0">
                            <Property id="B11" pid="B11" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                            <Property id="B12" pid="B12" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                            <Property id="B13" pid="B13" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                            <Property id="B21" pid="B21" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                            <Property id="B22" pid="B22" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                            <Property id="B23" pid="B23" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                            <Property id="B31" pid="B31" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                            <Property id="B32" pid="B32" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                            <Property id="B33" pid="B33" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                        </Container>
                        <Container id="MatrixD" pid="Matrix D" icon="prop.gif" state="hidden" class="normal" help="General" open="0">
                            <Property id="D11" pid="D11" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                            <Property id="D12" pid="D12" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                            <Property id="D13" pid="D13" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                            <Property id="D21" pid="D21" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                            <Property id="D22" pid="D22" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                            <Property id="D23" pid="D23" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                            <Property id="D31" pid="D31" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                            <Property id="D32" pid="D32" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                            <Property id="D33" pid="D33" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                        </Container>
                    </Container>
                </Container>
                <Container id="ElastoPlastic" pid="Plasticity" icon="prop.gif" class="normal" help="General" open="0">
                    <Property id="YieldCriterion" pid="Yield criterion" class="YieldCriteria" value="VonMises" ivalues="VonMises" values="Von-Mises" delvalues="Energy,Mohr-Coulomb,Rankine,Drucker-Prager,Tresca" unit=" " icon="prop.gif" help="Helptext" open="0"/>
                    <Property id="YieldStress" pid="Yield Stress" value="0" unit=" " icon="prop.gif" help="Helptext" open="0"/>
                    <Property id="InternalFrictionAngle" pid="Internal friction angle" YieldCriteria="Mohr-Coulomb,DruckerPrager" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                    <Property id="DilatancyAngle" pid="Dilatancy angle" YieldCriteria="Mohr-Coulomb,DruckerPrager" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                    <Property id="HardeningType" pid="Hardening law" class="HardeningLaw" value="Isotropic" ivalues="Isotropic,Kinematic,IsotropicKinematic" values="Isotropic,Kinematic,Isotropic + Kinematic" unit=" " icon="prop.gif" help="Helptext" open="0"/>
                    <Property id="IsotropicHardeningModulus" pid="Isotropic hardening modulus" HardeningLaw="Isotropic,IsotropicKinematic" value="0" unit=" " icon="prop.gif" help="Helptext" open="0"/>
                    <Property id="KinematicHardeningModulus" pid="Kinematic hardening modulus" HardeningLaw="Kinematic,IsotropicKinematic" value="0" unit=" " icon="prop.gif" help="Helptext" open="0"/>
                    <Property id="SaturationLaw" pid="Saturation law" class="SaturationLaw" value="None" ivalues="None,Linear,Exponential" values="None,Linear,Exponential" unit=" " icon="prop.gif" help="Helptext" open="0"/>
                    <Property id="HardeningExponent" pid="Hardening exponent" SaturationLaw="Exponential" value="0" unit=" " icon="prop.gif" help="Helptext" open="0"/>
                    <Property id="ReferenceHardeningModulus" pid="Reference hardening modulus" SaturationLaw="Linear,Exponential" value="0" unit=" " icon="prop.gif" help="Helptext" open="0"/>
                    <Property id="InfinityHardeningModulus" pid="Infinity hardening modulus" SaturationLaw="Linear,Exponential" value="0" unit=" " icon="prop.gif" help="Helptext" open="0"/>
                    <Property id="FlowRule" pid="Flow rule" class="FlowRule" value="Linear" ivalues="Linear,Non-Linear" values="Linear,Non-Linear" unit=" " icon="prop.gif" help="Helptext" open="0"/>
                    <Property id="ImplicitIteration" pid="Backward Euler iterations" FlowRule="Non-Linear" value="30" unit=" " icon="prop.gif" help="Helptext" open="0"/>
                </Container>
                <Container id="Damage" pid="Damage" icon="prop.gif" state="hiddenAll" class="normal" help="General" open="0">
                    <Property id="SofteningLaw" pid="Softening law" class="SofteningLaw" value="Linear" ivalues="Linear,Exponential" values="Linear,Exponential" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                    <Property id="TensileStrength" pid="Tensile strength" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                    <Property id="CompressiveStrength" pid="Compressive strength" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                    <Property id="TensileFractureEnergy" pid="Tensile fracture energy" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                    <Property id="CompressiveFractureEnergy" pid="Compressive fracture energy" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                </Container>
            </Container>
            <Container id="Thermal" pid="Thermal" icon="prop.gif" state="normal" class="normal" help="General" open="0">
                <Container id="Isotropic" pid="Isotropic" icon="prop.gif" state="normal" class="normal" help="General" open="0">
                    <Property id="ExpansionCoeff" pid="Expansion coeff" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                    <Property id="Conductivity" pid="Conductivity" value="0" unit=" " icon="prop.gif" state="normal" help="Helptext" open="0"/>
                    <Property id="SpecificHeat" pid="Specific heat" value="0" unit=" " icon="prop.gif" state="normal" help="Helptext" open="0"/>
                </Container>
                <Container id="Orthotropic" pid="Orthotropic" icon="prop.gif" state="hidden" class="normal" help="General" open="0">
                    <Property id="K11" pid="K11" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                    <Property id="K22" pid="K22" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                    <Property id="K33" pid="K33" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                    <Property id="alfa11" pid="alfa 11" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                    <Property id="alfa22" pid="alfa 22" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                    <Property id="alfa33" pid="alfa 33" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                </Container>
            </Container>
            <Container id="Fluid" pid="Fluid" icon="prop.gif" class="normal" help="General" open="0">
                <Property id="NonNewtonianFluid" pid="Non-Newtonian fluid" class="NonNewtonianFluid" value="No" ivalues="Yes,No" values="Yes,No" icon="prop.gif" state="normal" help="Non-Newtonian fluid option"/>
                <Property id="Viscosity" pid="Viscosity" NonNewtonianFluid="No" value="0" unit=" " icon="prop.gif" state="normal" help="Helptext" open="0"/>
                <Property id="PlasticViscosity" pid="Plastic viscosity" value="0.001" unit=" " NonNewtonianFluid="Yes" icon="prop.gif" state="normal" help="Define the plastic viscosity value"/>
                <Property id="BulkModulus" pid="Bulk Modulus" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                <Property id="BinghamSmoother" pid="Bingham smoother" value="500.0" NonNewtonianFluid="Yes" unit=" " icon="prop.gif" state="normal" help="Define the Bingham smoother value"/>
                <Property id="YieldStress" pid="Yield stress" value="0.0" unit=" " NonNewtonianFluid="Yes" icon="prop.gif" state="normal" help="Define the yield stress value"/>
            </Container>
            <Container id="Electromagnetic" pid="Electromagnetic" icon="prop.gif" state="hiddenAll" class="normal" help="General" open="0">
                <Property id="MagneticPermeability" pid="Magnetic permeability" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
                <Property id="ElectricalPermitivity" pid="Electrical permitivity" value="0" unit=" " icon="prop.gif" state="hidden" help="Helptext" open="0"/>
            </Container>
        </Template>
        <Template id="NewDEMMaterial" help="New DEM material type" open="1">
            <Property id="Density" pid="Density" value="2300.0" unit=" " icon="prop.gif" state="normal" help="Helptext" open="0"/>
            <Property id="YoungModulus" pid="Young modulus" value="1.0e5" unit=" " icon="prop.gif" state="normal" help="Helptext" open="0"/>
            <Property id="PoissonRatio" pid="Poisson ratio" value="0.20" unit=" " icon="prop.gif" state="normal" help="Helptext" open="0"/>
            <Property id="ParticleDiameter" pid="Diameter" value="0.002" unit=" " icon="prop.gif" state="normal" help="Particle diameter" open="0"/>
            <Property id="ParticleSphericity" pid="Sphericity" value="1.0" unit=" " icon="prop.gif" state="normal" help="Particle sphericity" open="0"/>
            <Property id="ParticleFrictionAngle" pid="Friction angle" value="45.0" unit=" " icon="prop.gif" state="normal" help="Particle friction angle" open="0"/>
            <Property id="RestitutionCoefficient" pid="Restitution coefficient" value="0.0" unit=" " icon="prop.gif" state="normal" help="Restitution coefficient" open="0"/>
            <Property id="RollingFriction" pid="Rolling friction" value="0.0" unit=" " icon="prop.gif" state="normal" help="Rolling friction" open="0"/>
            <Property id="RotationalDampingRatio" pid="Rotational damping ratio" value="0.5" unit=" " icon="prop.gif" state="normal" help="Rotational damping ratio" open="0"/>
            <Property id="Color" pid="Color" value="1" unit=" " icon="prop.gif" state="normal" help="Color" open="0"/>
        </Template>
    </Templates>
</Kratos_KMat_DB>`

