<?xml version="1.0" encoding="UTF-8"?><sld:StyledLayerDescriptor xmlns="http://www.opengis.net/sld" xmlns:sld="http://www.opengis.net/sld" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" version="1.0.0">
  <sld:NamedLayer>
    <sld:Name>Default Styler</sld:Name>
    <sld:UserStyle>
      <sld:Name>Default Styler</sld:Name>
      <sld:FeatureTypeStyle>
        <sld:Rule>
          <sld:MinScaleDenominator>200001.0</sld:MinScaleDenominator>
          <sld:LineSymbolizer>
            <sld:Stroke>
              <sld:CssParameter name="stroke">#C5AB8E</sld:CssParameter>
              <sld:CssParameter name="stroke-opacity">0</sld:CssParameter>
            </sld:Stroke>
          </sld:LineSymbolizer>
        </sld:Rule>
        <sld:Rule>
          <sld:MinScaleDenominator>1.0</sld:MinScaleDenominator>
          <sld:MaxScaleDenominator>200001.0</sld:MaxScaleDenominator>
          <sld:LineSymbolizer>
            <sld:Stroke>
              <sld:CssParameter name="stroke">#C5AB8E</sld:CssParameter>
              <sld:CssParameter name="stroke-opacity">0.1</sld:CssParameter>
              <sld:CssParameter name="stroke-width">0.1</sld:CssParameter>
            </sld:Stroke>
          </sld:LineSymbolizer>
          <sld:TextSymbolizer>
            <sld:Geometry>
              <ogc:Function name="centroid">
                <ogc:PropertyName>geom</ogc:PropertyName>
              </ogc:Function>
            </sld:Geometry>
            <sld:Label>
              <ogc:PropertyName>name_2</ogc:PropertyName>
            </sld:Label>
            <sld:Font>
              <sld:CssParameter name="font-family">Dialog.plain</sld:CssParameter>
              <sld:CssParameter name="font-size">12</sld:CssParameter>
              <sld:CssParameter name="font-style">normal</sld:CssParameter>
              <sld:CssParameter name="font-weight">normal</sld:CssParameter>
            </sld:Font>
            <sld:LabelPlacement>
              <sld:PointPlacement>
                <sld:AnchorPoint>
                  <sld:AnchorPointX>0.5</sld:AnchorPointX>
                  <sld:AnchorPointY>0</sld:AnchorPointY>
                </sld:AnchorPoint>
                <sld:Displacement>
                  <sld:DisplacementX>0</sld:DisplacementX>
                  <sld:DisplacementY>5</sld:DisplacementY>
                </sld:Displacement>
              </sld:PointPlacement>
            </sld:LabelPlacement>
            <sld:Fill>
              <sld:CssParameter name="fill">#777777</sld:CssParameter>
            </sld:Fill>
            <sld:VendorOption name="maxDisplacement">600</sld:VendorOption>
            <sld:VendorOption name="repeat">600</sld:VendorOption>
          </sld:TextSymbolizer>
        </sld:Rule>
        <sld:Rule>
          <sld:MaxScaleDenominator>1.0</sld:MaxScaleDenominator>
          <sld:LineSymbolizer>
            <sld:Stroke>
              <sld:CssParameter name="stroke">#C5AB8E</sld:CssParameter>
            </sld:Stroke>
          </sld:LineSymbolizer>
        </sld:Rule>
        <sld:VendorOption name="ruleEvaluation">first</sld:VendorOption>
      </sld:FeatureTypeStyle>
    </sld:UserStyle>
  </sld:NamedLayer>
</sld:StyledLayerDescriptor>

